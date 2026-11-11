import {
  getCruiseCalls,
  getCruisesData,
  getSettings,
  getPublicTours,
  getTransfersData,
} from "@/lib/content";
import { formatPrice, groupSizeLabel } from "@/lib/format";
import { isFlatPriceTour } from "@/lib/tour-pricing";
import { localizeTours, localizeTransfers } from "@/lib/localize-content";
import { localePath } from "@/i18n/path";
import type { Locale } from "@/i18n/config";
import type { Tour } from "@/types";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type Lang = "es" | "en" | "de" | "fr";

function asLang(locale: string): Lang {
  if (locale === "en" || locale === "de" || locale === "fr") return locale;
  return "es";
}

function phrase(
  lang: Lang,
  copy: { es: string; en: string; de: string; fr: string }
): string {
  return copy[lang];
}

function asLocale(locale: string): Locale {
  return asLang(locale);
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function payLabel(tour: Tour, lang: Lang): string {
  const card = phrase(lang, {
    es: "100% tarjeta",
    en: "100% card",
    de: "100% Karte",
    fr: "100 % par carte",
  });
  const deposit = phrase(lang, {
    es: "20% tarjeta + resto en efectivo",
    en: "20% card + cash balance",
    de: "20% Karte + Rest bar",
    fr: "20 % par carte + solde en espèces",
  });
  const onDay = phrase(lang, {
    es: "pago el día del tour",
    en: "pay on the day",
    de: "Zahlung am Tourtag",
    fr: "paiement le jour de l'excursion",
  });
  if (isFlatPriceTour(tour)) return `${card}, ${deposit}`;
  const parts = [
    tour.allowCard ? card : "",
    tour.allowCard ? deposit : "",
    tour.allowPayOnDay ? onDay : "",
  ].filter(Boolean);
  return parts.join(", ") || card;
}

async function buildKnowledge(locale: string): Promise<string> {
  const lang = asLocale(locale);
  const [rawTours, rawTransfers, settings, cruiseData, cruiseCalls] =
    await Promise.all([
      getPublicTours(),
      getTransfersData(),
      getSettings(),
      getCruisesData(),
      getCruiseCalls({ publishedOnly: true }),
    ]);
  const [tours, transfers] = await Promise.all([
    localizeTours(rawTours, lang),
    localizeTransfers(rawTransfers, lang),
  ]);

  const tourLines = tours
    .map((t) => {
      const group = t.groupSize
        ? groupSizeLabel(t.groupSize, lang)
        : t.category;
      const max = t.maxGroup ? ` · max ${t.maxGroup}` : "";
      const price = isFlatPriceTour(t)
        ? `${formatPrice(t.priceAdult)} ${phrase(lang, { es: "precio cerrado", en: "closed price", de: "Festpreis", fr: "prix forfaitaire" })}`
        : `${formatPrice(t.priceAdult)} ${phrase(lang, { es: "adulto", en: "adult", de: "Erwachsener", fr: "adulte" })}`;
      const path = localePath(lang, `/excursiones/${t.slug}`);
      return `- ${t.shortTitle || t.title} (${group}${max}): ${price}, ${t.duration}. ${payLabel(t, asLang(locale))}. ${path}. ${t.summary || ""}`;
    })
    .join("\n");

  const transferLines = transfers.destinations
    .map(
      (d) =>
        `- ${phrase(lang, { es: "Aeropuerto", en: "Airport", de: "Flughafen", fr: "Aéroport" })} ↔ ${d.name}: ${phrase(lang, { es: "ida", en: "one way", de: "einfach", fr: "aller simple" })} ${formatPrice(d.priceOneWay)}, ${phrase(lang, { es: "ida y vuelta", en: "return", de: "hin und zurück", fr: "aller-retour" })} ${formatPrice(d.priceReturn)} (${d.duration})`
    )
    .join("\n");

  const upcomingCruises = cruiseCalls
    .slice(0, 25)
    .map(
      (c) =>
        `- ${c.date} ${c.shipName} (${c.company}): ${c.arrivalTime}-${c.departureTime}`
    )
    .join("\n");

  return `
Brand: ${settings.brandName}
Phone: ${settings.phone}
Email: ${settings.email}
Hours: ${settings.hours}
Excursions page: ${localePath(lang, "/excursiones")}
Transfers page: ${localePath(lang, "/traslados-aeropuerto-lanzarote")}
Cruise excursions page: ${localePath(lang, "/excursiones-cruceros")}
Cruise calendar: ${localePath(lang, "/cruceristas")}

EXCURSIONS (only these exist; do not invent others):
${tourLines}

PRIVATE TRANSFERS:
${transferLines}

CRUISE CALLS ${cruiseData.season} at ${cruiseData.port} (${cruiseCalls.length}):
${upcomingCruises}

RULES:
- Free cancellation if requested more than 48 hours before pickup. Less than 48 hours: no refund.
- Private excursions: only 100% card, or 20% card and the rest in cash. Never full cash on the day.
- Shared excursions: use only the payment methods listed on that excursion.
- Hotel pickup on the island. Cruise guests meet at the pier and must book from the cruise pages, not by typing a ship name on a normal excursion.
- Do not mention Grand Tour, Ruta Sur, group of 8 or group of 20 unless that exact name appears in the excursion list above.
`.trim();
}

const replies: Record<
  Lang,
  {
    hello: string;
    thanks: string;
    cruise: (url: string, calendar: string) => string;
    pay: string;
    cancel: string;
    book: (url: string) => string;
    fallback: string;
    pricesIntro: string;
    transfersIntro: (url: string) => string;
    contact: (phone: string, email: string, hours: string) => string;
  }
> = {
  es: {
    hello:
      "¡Hola! Soy el asistente de Lanzarote Tours. Puedo ayudarle con las excursiones que hay ahora en la web, traslados al aeropuerto, precios, pagos y escalas de crucero. ¿Qué necesita?",
    thanks:
      "De nada. Si quiere, le indico una excursión, un traslado o cómo reservar desde la web.",
    cruise: (url, calendar) =>
      `Si llega en crucero, la reserva se hace en la sección de cruceros (${url}), eligiendo naviera, barco y salida. El calendario de escalas está en ${calendar}. En las excursiones normales no hace falta indicar el barco. Dígame la fecha o el nombre del barco y le oriento.`,
    pay: "En las excursiones privadas solo hay dos opciones: pagar el 100% con tarjeta, o un 20% con tarjeta y el resto en efectivo el día del tour. En el resto de excursiones, las formas de pago son las que aparecen en cada ficha. La cancelación gratuita es hasta 48 horas antes.",
    cancel:
      "La cancelación es gratuita si la recibimos con más de 48 horas de antelación respecto a la recogida. Con menos de 48 horas no hay reembolso.",
    book: (url) =>
      `Puede reservar en cada ficha de excursión o en ${url}. Elija fecha, personas y forma de pago. Si me dice fecha, zona del hotel o si llega en crucero, le oriento.`,
    fallback:
      "Puedo ayudarle con las excursiones publicadas, traslados al aeropuerto, precios, formas de pago y cruceros. Pregúnteme, por ejemplo, por una excursión concreta o por un traslado.",
    pricesIntro: "Estos son los precios publicados ahora mismo:",
    transfersIntro: (url) =>
      `Traslados privados, con cartel en la terminal. Puede reservarlos en ${url}.`,
    contact: (phone, email, hours) =>
      `Puede llamarnos al ${phone} o escribir a ${email}. Horario: ${hours}.`,
  },
  en: {
    hello:
      "Hello! I am the Lanzarote Tours assistant. I can help with the excursions currently on the website, airport transfers, prices, payments and cruise calls. What do you need?",
    thanks:
      "You are welcome. I can point you to an excursion, a transfer or how to book on the website.",
    cruise: (url, calendar) =>
      `If you arrive by cruise, book in the cruise section (${url}) by choosing the cruise line, ship and sailing. The call calendar is at ${calendar}. You do not need to enter the ship on a regular excursion. Tell me the date or the ship name and I will guide you.`,
    pay: "Private excursions only offer two options: pay 100% by card, or 20% by card and the rest in cash on the day. Other excursions use the payment methods shown on each page. Free cancellation is up to 48 hours before pickup.",
    cancel:
      "Cancellation is free if we receive it more than 48 hours before pickup. With less than 48 hours there is no refund.",
    book: (url) =>
      `You can book on each excursion page or at ${url}. Choose the date, number of guests and payment method. Tell me the date, hotel area or if you arrive by cruise and I will guide you.`,
    fallback:
      "I can help with the published excursions, airport transfers, prices, payment methods and cruises. Ask me about a specific tour or a transfer.",
    pricesIntro: "These are the prices published right now:",
    transfersIntro: (url) =>
      `Private transfers, with a name board in the terminal. You can book them at ${url}.`,
    contact: (phone, email, hours) =>
      `You can call ${phone} or email ${email}. Hours: ${hours}.`,
  },
  de: {
    hello:
      "Hallo! Ich bin der Assistent von Lanzarote Tours. Ich helfe bei den Ausflügen auf der Website, Flughafentransfers, Preisen, Zahlung und Kreuzfahrtstopps. Wobei darf ich helfen?",
    thanks:
      "Gern. Ich kann einen Ausflug, einen Transfer oder die Online-Buchung empfehlen.",
    cruise: (url, calendar) =>
      `Wenn Sie mit dem Kreuzfahrtschiff kommen, buchen Sie im Kreuzfahrtbereich (${url}): Reederei, Schiff und Abfahrt wählen. Der Stopp-Kalender ist unter ${calendar}. Auf normalen Ausflügen müssen Sie das Schiff nicht angeben. Nennen Sie Datum oder Schiffsname.`,
    pay: "Bei privaten Ausflügen gibt es nur zwei Möglichkeiten: 100% per Karte oder 20% per Karte und den Rest bar am Tourtag. Bei den übrigen Ausflügen gelten die Zahlungsarten der jeweiligen Seite. Kostenlose Stornierung bis 48 Stunden vor der Abholung.",
    cancel:
      "Die Stornierung ist kostenlos, wenn wir sie mehr als 48 Stunden vor der Abholung erhalten. Bei weniger als 48 Stunden gibt es keine Erstattung.",
    book: (url) =>
      `Sie können auf jeder Ausflugsseite oder unter ${url} buchen. Wählen Sie Datum, Personen und Zahlungsart. Nennen Sie Datum, Hotelzone oder ob Sie mit dem Schiff kommen.`,
    fallback:
      "Ich helfe bei den veröffentlichten Ausflügen, Flughafentransfers, Preisen, Zahlungsarten und Kreuzfahrten. Fragen Sie nach einem konkreten Ausflug oder einem Transfer.",
    pricesIntro: "Das sind die aktuell veröffentlichten Preise:",
    transfersIntro: (url) =>
      `Private Transfers, mit Namensschild im Terminal. Buchung unter ${url}.`,
    contact: (phone, email, hours) =>
      `Sie erreichen uns unter ${phone} oder ${email}. Zeiten: ${hours}.`,
  },
  fr: {
    hello:
      "Bonjour ! Je suis l'assistant de Lanzarote Tours. Je peux vous aider pour les excursions actuellement sur le site, les transferts aéroport, les prix, les paiements et les escales de croisière. Que puis-je faire pour vous ?",
    thanks:
      "Avec plaisir. Je peux vous indiquer une excursion, un transfert ou comment réserver sur le site.",
    cruise: (url, calendar) =>
      `Si vous arrivez en croisière, la réservation se fait dans la section croisières (${url}), en choisissant la compagnie, le navire et le départ. Le calendrier des escales est sur ${calendar}. Il n'est pas nécessaire d'indiquer le navire sur une excursion classique. Dites-moi la date ou le nom du navire et je vous oriente.`,
    pay: "Pour les excursions privées, deux options seulement : payer 100 % par carte, ou 20 % par carte et le reste en espèces le jour de l'excursion. Pour les autres excursions, les moyens de paiement sont ceux indiqués sur chaque fiche. L'annulation est gratuite jusqu'à 48 heures avant la prise en charge.",
    cancel:
      "L'annulation est gratuite si nous la recevons plus de 48 heures avant la prise en charge. À moins de 48 heures, il n'y a pas de remboursement.",
    book: (url) =>
      `Vous pouvez réserver sur chaque fiche d'excursion ou sur ${url}. Choisissez la date, le nombre de personnes et le moyen de paiement. Indiquez-moi la date, la zone de l'hôtel ou si vous arrivez en croisière, et je vous oriente.`,
    fallback:
      "Je peux vous aider pour les excursions publiées, les transferts aéroport, les prix, les moyens de paiement et les croisières. Demandez-moi, par exemple, une excursion précise ou un transfert.",
    pricesIntro: "Voici les prix publiés en ce moment :",
    transfersIntro: (url) =>
      `Transferts privés, avec pancarte à votre nom dans le terminal. Vous pouvez les réserver sur ${url}.`,
    contact: (phone, email, hours) =>
      `Vous pouvez nous appeler au ${phone} ou écrire à ${email}. Horaires : ${hours}.`,
  },
};

function localReply(message: string, knowledge: string, locale: string): string {
  const lang = asLang(locale);
  const t = replies[lang];
  const q = normalize(message);
  const excursions = localePath(asLocale(locale), "/excursiones");
  const transfers = localePath(
    asLocale(locale),
    "/traslados-aeropuerto-lanzarote"
  );
  const cruises = localePath(asLocale(locale), "/excursiones-cruceros");
  const calendar = localePath(asLocale(locale), "/cruceristas");

  if (
    /^(hola|buenas|hey|hello|hi|hallo|guten tag|buenos dias|buenas tardes|bonjour|salut|bonsoir)\b/.test(
      q
    ) &&
    q.length < 40
  ) {
    return t.hello;
  }
  if (/gracias|thank|danke|merci/.test(q) && q.length < 40) return t.thanks;
  if (/crucero|cruise|schiff|crucerista|escala|hafenstopp|barco|ship|croisiere|bateau|escale/.test(q)) {
    return t.cruise(cruises, calendar);
  }
  if (
    /traslad|aeropuerto|airport|flughafen|transfer|taxi|recogida|playa blanca|puerto del carmen|costa teguise|aeroport|transfert/.test(
      q
    )
  ) {
    const lines = knowledge
      .split("\n")
      .filter((line) => line.includes("↔"))
      .join("\n");
    return `${t.transfersIntro(transfers)}\n\n${lines}`;
  }
  if (/pago|pagar|pay|zahlung|bezahlen|tarjeta|card|karte|efectivo|cash|bar\b|paiement|payer|carte|especes/.test(q)) {
    return t.pay;
  }
  if (/cancel|reembol|storno|anular|annul/.test(q)) return t.cancel;
  if (/contacto|telefono|phone|telefon|email|correo|whatsapp|horario|hours|telephone|courriel/.test(q)) {
    const phone = knowledge.match(/Phone: (.+)/)?.[1] || "+34 646 08 05 85";
    const email =
      knowledge.match(/Email: (.+)/)?.[1] ||
      "support@lanzaroteexperiencetours.com";
    const hours = knowledge.match(/Hours: (.+)/)?.[1] || "";
    return t.contact(phone, email, hours);
  }
  if (/precio|cuanto|cuesta|price|cost|preis|kostet|prix|coute|coûte|€/.test(q)) {
    const lines = knowledge
      .split("\n")
      .filter((line) => line.startsWith("- ") && !line.includes("↔"))
      .slice(0, 8)
      .join("\n");
    return `${t.pricesIntro}\n\n${lines}`;
  }
  if (/reserva|reservar|book|buchen|reserver|réserver/.test(q)) return t.book(excursions);

  const matched = knowledge
    .split("\n")
    .filter((line) => {
      if (!line.startsWith("- ")) return false;
      const name = normalize(line.slice(2, 48));
      return q.split(/\s+/).some((word) => word.length > 3 && name.includes(word));
    })
    .slice(0, 4);
  if (matched.length) {
    return `${t.pricesIntro}\n\n${matched.join("\n")}`;
  }
  return t.fallback;
}

const langName: Record<string, string> = {
  es: "Spanish",
  en: "English",
  de: "German",
  fr: "French",
};

async function openaiReply(
  messages: ChatMessage[],
  knowledge: string,
  locale: string
): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  const language = langName[asLang(locale)] || "Spanish";

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: `You are the booking assistant for Lanzarote Tours, a local family company in Lanzarote. Reply only in ${language}, in a polite and brief way (max 140 words unless listing prices). Use ONLY the excursions, prices and rules in CONTEXT. Never invent tours, prices or payment methods. If a tour is not in the list, say so and link to the excursions page. Private tours never offer paying the full amount in cash on the day. Include the paths from CONTEXT when helpful.

CONTEXT:
${knowledge}`,
          },
          ...messages.slice(-8).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch {
    return null;
  }
}

export async function answerChat(
  messages: ChatMessage[],
  locale = "es"
): Promise<{
  reply: string;
  mode: "openai" | "local";
}> {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser?.content?.trim()) {
    return { reply: replies[asLang(locale)].hello, mode: "local" };
  }

  const knowledge = await buildKnowledge(locale);
  const ai = await openaiReply(messages, knowledge, locale);
  if (ai) return { reply: ai, mode: "openai" };

  return {
    reply: localReply(lastUser.content, knowledge, locale),
    mode: "local",
  };
}
