import type { Metadata } from "next";
import { CheckCircle2, MapPin, Plane } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { TransferBookingForm } from "@/components/TransferBookingForm";
import { getSettings, getTransfersData } from "@/lib/content";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Traslados privados",
  description:
    "Traslados privados Aeropuerto César Manrique-Lanzarote. Cancelación gratis 24 h, sillas gratis y recibimiento con cartel.",
};

export default async function TrasladosPage() {
  const [transfers, settings] = await Promise.all([
    getTransfersData(),
    getSettings(),
  ]);
  const faqs = transfers.faqs || [];
  const airport = transfers.airport;

  return (
    <>
      <PageHero
        image={settings.transferHeroImage}
        eyebrow="Aeropuerto de Lanzarote"
        title="Traslados privados"
        subtitle={settings.transferIntro}
      />

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {transfers.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 rounded-2xl bg-surface px-4 py-3 text-sm ring-1 ring-sand-line"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ocean" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-12 overflow-hidden rounded-2xl bg-surface ring-1 ring-sand-line">
          <div className="border-b border-sand-line bg-sky-soft/80 px-4 py-3">
            <h2 className="font-display text-xl text-ink">
              Destinos y tarifas
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-sand-line text-ink-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Destino</th>
                  <th className="px-4 py-3 font-medium">Duración</th>
                  <th className="px-4 py-3 font-medium">Ida</th>
                  <th className="px-4 py-3 font-medium">Ida y vuelta</th>
                </tr>
              </thead>
              <tbody>
                {transfers.destinations.map((d) => (
                  <tr
                    key={d.id}
                    className="border-b border-sand-line last:border-0"
                  >
                    <td className="px-4 py-3.5 font-semibold text-ink">
                      Aeropuerto ↔ {d.name}
                    </td>
                    <td className="px-4 py-3.5 text-ink-muted">{d.duration}</td>
                    <td className="px-4 py-3.5 font-medium text-ocean-deep">
                      {formatPrice(d.priceOneWay)}
                    </td>
                    <td className="px-4 py-3.5 font-medium text-ocean-deep">
                      {formatPrice(d.priceReturn)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-sand-line px-4 py-3 text-xs text-ink-muted">
            ¿Tu destino no está en la lista? Escríbenos: te llevamos a
            cualquier punto de la isla.
          </p>
        </div>

        <div className="mt-12">
          <TransferBookingForm destinations={transfers.destinations} />
        </div>

        {airport && (
          <div className="mt-16 overflow-hidden rounded-3xl bg-bg-deep text-white md:grid md:grid-cols-2">
            <div className="flex flex-col justify-center p-8 md:p-10">
              <Plane className="h-8 w-8 text-sky-mist" />
              <h2 className="mt-4 font-display text-3xl">{airport.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                {airport.intro}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/80">
                <li className="flex gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  {airport.address}
                </li>
                <li>Teléfono: {airport.phone}</li>
                <li>Horario: {airport.hours}</li>
                <li>{airport.passengers}</li>
              </ul>
              <a
                href={airport.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-fit rounded-md bg-ocean px-5 py-2.5 text-sm font-semibold text-white hover:bg-ocean-deep"
              >
                Ver en Google Maps
              </a>
            </div>
            <div className="border-t border-white/10 p-8 md:border-t-0 md:border-l md:p-10">
              <h3 className="font-display text-2xl">¿Por qué un traslado privado?</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Evita largas esperas en taxis y autobuses públicos. Nuestro
                personal te espera en la terminal de llegadas para llevarte
                directamente a tu destino vacacional de forma cómoda y rápida.
              </p>
            </div>
          </div>
        )}

        {faqs.length > 0 && (
          <div id="faq" className="mt-16">
            <h2 className="font-display text-3xl text-ink">
              Preguntas frecuentes sobre los traslados
            </h2>
            <div className="mt-8 space-y-3">
              {faqs.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl bg-white p-5 ring-1 ring-sand-line open:ring-ocean/30"
                >
                  <summary className="cursor-pointer list-none font-semibold text-ink">
                    <span className="inline-flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ocean" />
                      {item.q}
                    </span>
                  </summary>
                  <p className="mt-3 pl-6 text-sm leading-relaxed text-ink-muted">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
