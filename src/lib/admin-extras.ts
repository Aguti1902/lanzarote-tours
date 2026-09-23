import type {
  Collaborator,
  CruiseGroup,
  CruisePort,
  CustomerFeedback,
  PaymentLink,
  SeoRedirect,
} from "@/types";
import { readCmsJsonFresh, writeCmsJson } from "@/lib/supabase/cms-store";

export type AdminExtrasData = {
  paymentLinks: PaymentLink[];
  collaborators: Collaborator[];
  feedback: CustomerFeedback[];
  cruisePorts: CruisePort[];
  cruiseGroups: CruiseGroup[];
  redirects: SeoRedirect[];
  /** ISO date when past cruise groups were purged for a clean restart */
  cruiseGroupsResetAt?: string;
};

const empty: AdminExtrasData = {
  paymentLinks: [],
  collaborators: [],
  feedback: [],
  cruisePorts: [],
  cruiseGroups: [],
  redirects: [],
};

async function readData(): Promise<AdminExtrasData> {
  try {
    const stored = await readCmsJsonFresh<Partial<AdminExtrasData>>(
      "adminExtras.json"
    );
    return { ...empty, ...stored };
  } catch {
    return empty;
  }
}

async function writeData(data: AdminExtrasData): Promise<void> {
  await writeCmsJson("adminExtras.json", data);
}

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 6)}`;
}

/* ── Payment links ── */
export async function getPaymentLinks() {
  return (await readData()).paymentLinks;
}

export async function getPaymentLinkByHash(hash: string) {
  if (!hash) return null;
  const links = await getPaymentLinks();
  return (
    links.find((p) => p.paymentHash === hash || p.id === hash) || null
  );
}

export async function upsertPaymentLink(
  input: Partial<PaymentLink> & Pick<PaymentLink, "concept" | "amount">
) {
  const data = await readData();
  if (input.id) {
    const idx = data.paymentLinks.findIndex((p) => p.id === input.id);
    if (idx >= 0) {
      const merged = {
        ...data.paymentLinks[idx],
        ...input,
      } as PaymentLink;
      // Vaciar sesión Stripe si se pide explícitamente (importe editado)
      if (input.stripeCheckoutUrl === "") {
        delete merged.stripeCheckoutUrl;
        delete merged.stripeCheckoutSessionId;
        delete merged.stripePaymentIntentId;
      }
      if (input.bookingIds) {
        merged.bookingIds = [...input.bookingIds];
      }
      data.paymentLinks[idx] = merged;
      await writeData(data);
      return data.paymentLinks[idx];
    }
  }
  const created: PaymentLink = {
    id: uid("pay"),
    createdAt: new Date().toISOString(),
    locator: input.locator || `PAY-${1000 + data.paymentLinks.length + 1}`,
    concept: input.concept,
    amount: Number(input.amount) || 0,
    status: input.status || "pending",
    customerName: input.customerName || "",
    customerEmail: input.customerEmail || "",
    customerLocale: input.customerLocale || "es",
    notes: input.notes || "",
    paidAt: input.paidAt,
    paymentMethod: input.paymentMethod,
    paymentKey: input.paymentKey,
    paymentHash:
      input.paymentHash ||
      `${uid("h")}${Math.random().toString(16).slice(2, 10)}`,
    groupId: input.groupId || undefined,
    bookingId: input.bookingId || undefined,
    bookingIds: input.bookingIds?.length
      ? [...input.bookingIds]
      : input.bookingId
        ? [input.bookingId]
        : undefined,
    mode: input.mode || "standard",
    personIndex: input.personIndex,
    personLabel: input.personLabel || undefined,
    serviceType: input.serviceType || "custom",
    serviceId: input.serviceId,
    serviceTitle: input.serviceTitle,
    chargeFull: input.chargeFull ?? true,
    stripeCheckoutSessionId: input.stripeCheckoutSessionId,
    stripePaymentIntentId: input.stripePaymentIntentId,
    stripeCheckoutUrl: input.stripeCheckoutUrl,
  };
  data.paymentLinks.unshift(created);
  await writeData(data);
  return created;
}

export function buildPaymentUrl(
  item: PaymentLink,
  origin: string
): string {
  const locale = item.customerLocale || "es";
  const hash = item.paymentHash || item.id;
  const email = encodeURIComponent(item.customerEmail || "");
  return `${origin}/${locale}/gateway?h=${encodeURIComponent(hash)}&email=${email}&ref=${encodeURIComponent(item.locator)}`;
}

export function isManualCruiseGroup(group: {
  manual?: boolean;
  notes?: string;
  spawnedFromId?: string;
}): boolean {
  if (group.manual === true) return true;
  if (group.manual === false) return false;
  if (group.spawnedFromId) return false;
  const notes = group.notes || "";
  if (
    /automáticamente|automaticamente|grupo automático|cupo lleno/i.test(notes)
  ) {
    return false;
  }
  return true;
}

export function remainingGroupSeats(
  group: { maxPax?: number },
  occupiedPax: number
): number {
  const max = Number(group.maxPax) || 0;
  if (max <= 0) return 0;
  return Math.max(0, max - Math.max(0, occupiedPax));
}

/** Create group_all + per_person payment links for a cruise group (manual share). */
export async function ensureGroupPaymentLinks(
  group: CruiseGroup,
  options?: {
    forcePerPerson?: boolean;
    personCount?: number;
    occupiedPax?: number;
  }
): Promise<{ groupAll: PaymentLink | null; perPerson: PaymentLink[] }> {
  const data = await readData();
  const existing = data.paymentLinks.filter(
    (p) => p.groupId === group.id && p.status !== "cancelled"
  );
  const price = Number(group.pricePerPerson) || 0;
  const occupied =
    options?.occupiedPax != null
      ? Math.max(0, Number(options.occupiedPax) || 0)
      : Math.max(0, Number(group.pax) || 0);
  const remaining =
    options?.personCount != null
      ? Math.max(0, Number(options.personCount) || 0)
      : remainingGroupSeats(group, occupied);
  const amount = Math.round(price * remaining * 100) / 100;
  const manual = Boolean(options?.forcePerPerson) || isManualCruiseGroup(group);
  const seriesLabel =
    group.seriesIndex && group.seriesIndex > 1
      ? ` · Grupo ${group.seriesIndex}`
      : "";

  let groupAll = existing.find((p) => p.mode === "group_all") || null;
  if (remaining <= 0 || price <= 0) {
    if (groupAll && groupAll.status === "pending") {
      groupAll = await upsertPaymentLink({ ...groupAll, status: "cancelled" });
      groupAll = null;
    }
  } else if (!groupAll) {
    groupAll = await upsertPaymentLink({
      concept: `Grupo ${group.shipName} — ${group.excursionTitle} (${group.date})${seriesLabel} · ${remaining} plazas libres`,
      amount,
      customerName: group.shipName,
      customerLocale: "es",
      notes: `Pago de las ${remaining} plazas libres del grupo ${group.id}`,
      groupId: group.id,
      mode: "group_all",
      locator: `GRP-${group.id.replace(/^grp-/, "").slice(0, 10).toUpperCase()}`,
    });
  } else if (groupAll.status === "pending") {
    groupAll = await upsertPaymentLink({
      ...groupAll,
      concept: `Grupo ${group.shipName} — ${group.excursionTitle} (${group.date})${seriesLabel} · ${remaining} plazas libres`,
      amount,
      notes: `Pago de las ${remaining} plazas libres del grupo ${group.id}`,
      stripeCheckoutUrl: "",
    });
  }

  let perPerson = existing
    .filter((p) => p.mode === "per_person")
    .sort((a, b) => (a.personIndex || 0) - (b.personIndex || 0));

  if (!manual || remaining <= 0 || price <= 0) {
    for (const link of perPerson) {
      if (link.status === "pending") {
        await upsertPaymentLink({ ...link, status: "cancelled" });
      }
    }
    return {
      groupAll: groupAll && groupAll.status !== "cancelled" ? groupAll : null,
      perPerson: [],
    };
  }

  const kept: PaymentLink[] = [];
  for (const link of perPerson) {
    const index = link.personIndex || 0;
    if (index > remaining && link.status === "pending") {
      await upsertPaymentLink({ ...link, status: "cancelled" });
      continue;
    }
    if (link.status === "pending" && link.amount !== price) {
      kept.push(
        await upsertPaymentLink({
          ...link,
          amount: price,
          stripeCheckoutUrl: "",
        })
      );
    } else {
      kept.push(link);
    }
  }

  const have = new Set(kept.map((p) => p.personIndex || 0));
  for (let i = 1; i <= remaining; i++) {
    if (have.has(i)) continue;
    const link = await upsertPaymentLink({
      concept: `Grupo ${group.shipName} — ${group.excursionTitle} (${group.date})${seriesLabel} · persona ${i}`,
      amount: price,
      customerLocale: "es",
      notes: `Pago individual #${i} del grupo ${group.id}`,
      groupId: group.id,
      mode: "per_person",
      personIndex: i,
      personLabel: `Persona ${i}`,
      locator: `GRP-${group.id.replace(/^grp-/, "").slice(0, 8).toUpperCase()}-P${i}`,
    });
    kept.push(link);
  }

  return {
    groupAll: groupAll && groupAll.status !== "cancelled" ? groupAll : null,
    perPerson: kept
      .filter((p) => p.status !== "cancelled" && (p.personIndex || 0) <= remaining)
      .sort((a, b) => (a.personIndex || 0) - (b.personIndex || 0)),
  };
}

export async function deletePaymentLink(id: string) {
  const data = await readData();
  const next = data.paymentLinks.filter((p) => p.id !== id);
  if (next.length === data.paymentLinks.length) return false;
  data.paymentLinks = next;
  await writeData(data);
  return true;
}

/* ── Collaborators ── */
export async function getCollaborators() {
  return (await readData()).collaborators;
}

export async function upsertCollaborator(
  input: Partial<Collaborator> & Pick<Collaborator, "name">
) {
  const data = await readData();
  if (input.id) {
    const idx = data.collaborators.findIndex((c) => c.id === input.id);
    if (idx >= 0) {
      data.collaborators[idx] = {
        ...data.collaborators[idx],
        ...input,
      } as Collaborator;
      await writeData(data);
      return data.collaborators[idx];
    }
  }
  const created: Collaborator = {
    id: uid("col"),
    name: input.name,
    type: input.type || "agency",
    active: input.active ?? true,
    phone: input.phone || "",
    email: input.email || "",
    contactPerson: input.contactPerson || "",
    notes: input.notes || "",
  };
  data.collaborators.unshift(created);
  await writeData(data);
  return created;
}

export async function deleteCollaborator(id: string) {
  const data = await readData();
  const next = data.collaborators.filter((c) => c.id !== id);
  if (next.length === data.collaborators.length) return false;
  data.collaborators = next;
  await writeData(data);
  return true;
}

/* ── Feedback ── */
export async function getFeedback() {
  return (await readData()).feedback;
}

export async function upsertFeedback(
  input: Partial<CustomerFeedback> &
    Pick<CustomerFeedback, "ratingGeneral" | "source">
) {
  const data = await readData();
  if (input.id) {
    const idx = data.feedback.findIndex((f) => f.id === input.id);
    if (idx >= 0) {
      data.feedback[idx] = { ...data.feedback[idx], ...input } as CustomerFeedback;
      await writeData(data);
      return data.feedback[idx];
    }
  }
  const created: CustomerFeedback = {
    id: uid("fb"),
    createdAt: new Date().toISOString(),
    bookingId: input.bookingId || "",
    ratingGeneral: Number(input.ratingGeneral) || 0,
    ratingContent: Number(input.ratingContent) || 0,
    ratingBooking: Number(input.ratingBooking) || 0,
    source: input.source,
    suggestions: input.suggestions || "",
    customerName: input.customerName || "",
  };
  data.feedback.unshift(created);
  await writeData(data);
  return created;
}

export async function deleteFeedback(id: string) {
  const data = await readData();
  const next = data.feedback.filter((f) => f.id !== id);
  if (next.length === data.feedback.length) return false;
  data.feedback = next;
  await writeData(data);
  return true;
}

/* ── Cruise ports ── */
export async function getCruisePorts() {
  return (await readData()).cruisePorts;
}

export async function upsertCruisePort(
  input: Partial<CruisePort> & Pick<CruisePort, "name">
) {
  const data = await readData();
  if (input.id) {
    const idx = data.cruisePorts.findIndex((p) => p.id === input.id);
    if (idx >= 0) {
      data.cruisePorts[idx] = { ...data.cruisePorts[idx], ...input } as CruisePort;
      await writeData(data);
      return data.cruisePorts[idx];
    }
  }
  const created: CruisePort = {
    id: uid("port"),
    name: input.name,
    region: input.region || "",
    offersExcursions: input.offersExcursions ?? false,
  };
  data.cruisePorts.unshift(created);
  await writeData(data);
  return created;
}

export async function deleteCruisePort(id: string) {
  const data = await readData();
  const next = data.cruisePorts.filter((p) => p.id !== id);
  if (next.length === data.cruisePorts.length) return false;
  data.cruisePorts = next;
  await writeData(data);
  return true;
}

/* ── Cruise groups ── */
const CRUISE_GROUPS_RESET_AT = "2026-09-01";

async function getLocalCruiseGroups() {
  const data = await readData();
  const today = new Date().toISOString().slice(0, 10);
  // Solo filtra en memoria. Nunca reescribe el CMS (evita borrar grupos reales).
  if (data.cruiseGroupsResetAt !== CRUISE_GROUPS_RESET_AT) {
    return data.cruiseGroups.filter((g) => (g.date || "").slice(0, 10) >= today);
  }
  return data.cruiseGroups;
}

function cruiseGroupKey(group: CruiseGroup) {
  return [
    (group.date || "").slice(0, 10),
    (group.shipName || "").toLowerCase(),
    (group.excursionTitle || "").toLowerCase(),
    String(group.seriesIndex ?? 1),
  ].join("|");
}

async function persistMissingCruiseGroups(groups: CruiseGroup[]) {
  try {
    const stored = await readCmsJsonFresh<Partial<AdminExtrasData>>(
      "adminExtras.json"
    );
    if (!stored || typeof stored !== "object") return;
    const current = stored.cruiseGroups || [];
    const ids = new Set(current.map((g) => g.id));
    const keys = new Set(current.map(cruiseGroupKey));
    const next = [...current];
    for (const group of groups) {
      if (!group?.id || ids.has(group.id) || keys.has(cruiseGroupKey(group))) {
        continue;
      }
      next.push(group);
      ids.add(group.id);
      keys.add(cruiseGroupKey(group));
    }
    if (next.length === current.length) return;
    await writeData({ ...empty, ...stored, cruiseGroups: next });
  } catch {
    // Si el CMS no responde, no se reescribe nada.
  }
}

export async function getCruiseGroups() {
  const { syncAndListHubCruiseGroups } = await import("@/lib/hub/cruise-groups");
  const local = await getLocalCruiseGroups();
  const shared = await syncAndListHubCruiseGroups(local);
  const items = shared ?? local;
  await persistMissingCruiseGroups(items);
  return items;
}

export async function upsertCruiseGroup(
  input: Partial<CruiseGroup> &
    Pick<CruiseGroup, "shipName" | "date" | "excursionTitle">
) {
  const { isHubConfigured } = await import("@/lib/hub/config");
  const { listHubCruiseGroups, upsertHubCruiseGroup } = await import(
    "@/lib/hub/cruise-groups"
  );
  if (isHubConfigured()) {
    const remote = (await listHubCruiseGroups()) || [];
    if (input.id) {
      const current = remote.find((g) => g.id === input.id);
      if (current) {
        const merged = { ...current, ...input } as CruiseGroup;
        return (await upsertHubCruiseGroup(merged)) || merged;
      }
    }
    const created: CruiseGroup = {
      id: input.id || uid("grp"),
      status: input.status || "open",
      shipName: input.shipName,
      company: input.company || "",
      date: input.date,
      port: input.port || "Lanzarote",
      excursionTitle: input.excursionTitle,
      complete: input.complete ?? false,
      minPax: Number(input.minPax) || 0,
      maxPax: input.maxPax != null ? Number(input.maxPax) : undefined,
      pax: Number(input.pax) || 0,
      pricePerPerson:
        input.pricePerPerson != null ? Number(input.pricePerPerson) : undefined,
      departureDate: input.departureDate || undefined,
      sailingId: input.sailingId || undefined,
      notes: input.notes || "",
      spawnedFromId: input.spawnedFromId || undefined,
      seriesIndex: input.seriesIndex != null ? Number(input.seriesIndex) : 1,
      manual: input.manual,
    };
    return (await upsertHubCruiseGroup(created)) || created;
  }

  const data = await readData();
  if (input.id) {
    const idx = data.cruiseGroups.findIndex((g) => g.id === input.id);
    if (idx >= 0) {
      data.cruiseGroups[idx] = {
        ...data.cruiseGroups[idx],
        ...input,
      } as CruiseGroup;
      await writeData(data);
      return data.cruiseGroups[idx];
    }
  }
  const created: CruiseGroup = {
    id: uid("grp"),
    status: input.status || "open",
    shipName: input.shipName,
    company: input.company || "",
    date: input.date,
    port: input.port || "Lanzarote",
    excursionTitle: input.excursionTitle,
    complete: input.complete ?? false,
    minPax: Number(input.minPax) || 0,
    maxPax: input.maxPax != null ? Number(input.maxPax) : undefined,
    pax: Number(input.pax) || 0,
    pricePerPerson:
      input.pricePerPerson != null ? Number(input.pricePerPerson) : undefined,
    departureDate: input.departureDate || undefined,
    sailingId: input.sailingId || undefined,
    notes: input.notes || "",
    spawnedFromId: input.spawnedFromId || undefined,
    seriesIndex:
      input.seriesIndex != null ? Number(input.seriesIndex) : 1,
    manual: input.manual,
  };
  data.cruiseGroups.unshift(created);
  await writeData(data);
  return created;
}

export async function deleteCruiseGroup(id: string) {
  const { isHubConfigured } = await import("@/lib/hub/config");
  const { deleteHubCruiseGroup } = await import("@/lib/hub/cruise-groups");
  if (isHubConfigured()) {
    const ok = await deleteHubCruiseGroup(id);
    return ok === true;
  }
  const data = await readData();
  const next = data.cruiseGroups.filter((g) => g.id !== id);
  if (next.length === data.cruiseGroups.length) return false;
  data.cruiseGroups = next;
  await writeData(data);
  return true;
}

/* ── Redirects ── */
export async function getRedirects() {
  return (await readData()).redirects;
}

export async function upsertRedirect(
  input: Partial<SeoRedirect> & Pick<SeoRedirect, "fromSlug" | "toSlug">
) {
  const data = await readData();
  if (input.id) {
    const idx = data.redirects.findIndex((r) => r.id === input.id);
    if (idx >= 0) {
      data.redirects[idx] = { ...data.redirects[idx], ...input } as SeoRedirect;
      await writeData(data);
      return data.redirects[idx];
    }
  }
  const created: SeoRedirect = {
    id: uid("redir"),
    httpCode: input.httpCode || 301,
    locale: input.locale || "es",
    fromSlug: input.fromSlug.replace(/^\/+|\/+$/g, ""),
    toSlug: input.toSlug.replace(/^\/+|\/+$/g, ""),
  };
  data.redirects.unshift(created);
  await writeData(data);
  return created;
}

export async function deleteRedirect(id: string) {
  const data = await readData();
  const next = data.redirects.filter((r) => r.id !== id);
  if (next.length === data.redirects.length) return false;
  data.redirects = next;
  await writeData(data);
  return true;
}
