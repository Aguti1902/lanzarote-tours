"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import type { Tour } from "@/types";

function isActive(tour: Tour) {
  return tour.active !== false;
}

export default function AdminExcursionesPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingOrder, setSavingOrder] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/tours");
    const data = await res.json();
    setTours(data.tours || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function persistOrder(next: Tour[]) {
    setTours(next);
    setSavingOrder(true);
    try {
      const res = await fetch("/api/tours", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: next.map((t) => t.id) }),
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.tours)) {
        setTours(data.tours);
      }
    } finally {
      setSavingOrder(false);
    }
  }

  function moveTour(fromId: string, toId: string) {
    if (fromId === toId) return;
    const from = tours.findIndex((t) => t.id === fromId);
    const to = tours.findIndex((t) => t.id === toId);
    if (from < 0 || to < 0) return;
    const next = [...tours];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    void persistOrder(next);
  }

  async function remove(id: string, title: string) {
    if (!confirm(`¿Eliminar «${title}»?`)) return;
    await fetch(`/api/tours?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl uppercase tracking-wide text-ink">
            Listado de excursiones
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            {loading
              ? "Cargando…"
              : `${tours.length} excursiones · Arrastre para el mismo orden que en la web`}
            {savingOrder ? " · Guardando orden…" : ""}
          </p>
        </div>
        <Link
          href="/admin/excursiones/nueva"
          className="inline-flex items-center gap-2 rounded-md bg-ocean px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-ocean-deep"
        >
          <Plus className="h-4 w-4" />
          Crear una excursión
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-sand-line">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead className="border-b border-sand-line bg-bg text-ink-muted">
            <tr>
              <th className="w-12 px-2 py-3 font-medium" />
              <th className="px-4 py-3 font-medium">Orden</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Nombre del tour</th>
              <th className="px-4 py-3 font-medium">Isla</th>
              <th className="px-4 py-3 font-medium">Duración</th>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-ink-muted">
                  Cargando…
                </td>
              </tr>
            )}
            {!loading && tours.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-ink-muted">
                  No hay excursiones todavía.
                </td>
              </tr>
            )}
            {!loading &&
              tours.map((t, index) => {
                const active = isActive(t);
                return (
                  <tr
                    key={t.id}
                    draggable
                    onDragStart={() => setDragId(t.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      if (dragId) moveTour(dragId, t.id);
                      setDragId(null);
                    }}
                    className={`border-b border-sand-line/70 ${
                      dragId === t.id ? "bg-ocean/5" : ""
                    }`}
                  >
                    <td className="px-2 py-3 text-ink-muted">
                      <span
                        className="inline-flex cursor-grab text-ink-muted active:cursor-grabbing"
                        title="Arrastrar para reordenar"
                      >
                        <GripVertical className="h-4 w-4" />
                      </span>
                    </td>
                    <td className="px-4 py-3 tabular-nums text-ink-muted">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold">
                        <span
                          className={`h-3 w-3 rounded-full ${
                            active ? "bg-emerald-500" : "bg-rose-500"
                          }`}
                          title={active ? "Activa" : "Inactiva"}
                          aria-hidden
                        />
                        <span
                          className={
                            active ? "text-emerald-700" : "text-rose-700"
                          }
                        >
                          {active ? "Activa" : "Inactiva"}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {t.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={t.image}
                            alt=""
                            className="h-12 w-16 rounded object-cover ring-1 ring-sand-line"
                          />
                        ) : (
                          <div className="flex h-12 w-16 items-center justify-center rounded bg-bg text-[10px] text-ink-muted ring-1 ring-sand-line">
                            Sin foto
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-ink">
                            {t.title || t.shortTitle}
                          </p>
                          <p className="text-xs text-ink-muted">/{t.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{t.island || "—"}</td>
                    <td className="px-4 py-3">
                      {t.durationHours
                        ? `${t.durationHours} horas`
                        : t.duration || "—"}
                    </td>
                    <td className="px-4 py-3">{t.activityType || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/excursiones/${t.id}`}
                          className="inline-flex items-center rounded-md border border-ocean px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ocean hover:bg-ocean/10"
                        >
                          Editar
                        </Link>
                        <button
                          type="button"
                          onClick={() => remove(t.id, t.shortTitle)}
                          className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium text-coral hover:bg-coral/10"
                          aria-label={`Eliminar ${t.shortTitle}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
