import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, CreditCard, HelpCircle, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { TourCard } from "@/components/TourCard";
import { getSettings, getTours } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Excursiones",
  description:
    "Excursiones en Lanzarote: Sur y Timanfaya, Grand Tour, César Manrique, Ruta del Vino, La Graciosa y tours privados.",
};

const excursionFaqs = [
  {
    q: "¿Qué formas de pago aceptáis?",
    a: "PayPal, Stripe (tarjeta), transferencia, Bizum y efectivo.",
  },
  {
    q: "¿Dónde me recogéis?",
    a: "En las principales zonas turísticas: Puerto del Carmen, Costa Teguise, Arrecife, Puerto de Cruceros y Playa Blanca. La hora y el lugar se indican al reservar.",
  },
  {
    q: "¿Los vehículos son accesibles para sillas de ruedas?",
    a: "Utilizamos minibuses y buses, pero no son accesibles para sillas de ruedas.",
  },
  {
    q: "¿En qué idiomas se realizan las excursiones?",
    a: "En español, inglés y/o alemán.",
  },
  {
    q: "¿Debo reservar con antelación?",
    a: "Sí. Las plazas son limitadas y se agotan rápidamente.",
  },
  {
    q: "¿Ofrecéis tours privados?",
    a: "Sí, para familias, grupos de amigos, institutos o asociaciones. Puedes reservar online o por correo.",
  },
  {
    q: "¿Qué hago si me pierdo o no localizo al grupo?",
    a: "Los guías explican lugares y horario de regreso (máximo 10 minutos de espera). Contacta al +34 646 08 05 85.",
  },
  {
    q: "¿Recibiré confirmación?",
    a: "Tras la compra recibirás un email con confirmación, número de referencia y la posibilidad de descargar factura y reserva para mostrar al guía.",
  },
  {
    q: "¿Cuál es la política de cancelación?",
    a: "Con menos de 24 horas antes del tour no se reembolsa el importe abonado.",
  },
];

export default async function ExcursionesPage() {
  const [tours, settings] = await Promise.all([getTours(), getSettings()]);
  const small = tours.filter((t) => t.groupSize === "small");
  const large = tours.filter((t) => t.groupSize === "large");
  const maritime = tours.filter((t) =>
    ["i-love-graciosa", "la-graciosa-sail", "la-graciosa-a-tu-aire", "excursion-costa-a-costa"].includes(
      t.slug
    )
  );
  const other = tours.filter(
    (t) =>
      !t.groupSize &&
      !maritime.some((m) => m.id === t.id)
  );

  return (
    <>
      <PageHero
        image={settings.excursionsHeroImage}
        eyebrow="Catálogo"
        title={settings.excursionsTitle}
        subtitle={settings.excursionsIntro}
      />

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="sky-panel rounded-2xl p-5 ring-1 ring-sand-line">
            <Users className="h-6 w-6 text-ocean" />
            <h2 className="mt-3 font-display text-xl">Dos formatos</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Grupo pequeño (máx. 8) o en bus (hasta 50). Mismo recorrido,
              distinta experiencia.
            </p>
          </div>
          <div className="sky-panel rounded-2xl p-5 ring-1 ring-sand-line">
            <CreditCard className="h-6 w-6 text-ocean" />
            <h2 className="mt-3 font-display text-xl">Pagos claros</h2>
            <p className="mt-2 text-sm text-ink-muted">
              PayPal, Stripe, transferencia, Bizum y efectivo. En bus también
              puedes pagar el día del tour.
            </p>
          </div>
          <div className="sky-panel rounded-2xl p-5 ring-1 ring-sand-line">
            <HelpCircle className="h-6 w-6 text-ocean" />
            <h2 className="mt-3 font-display text-xl">Guía local</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Español, inglés y/o alemán. Recogida en las principales zonas
              turísticas de la isla.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { href: "#pequeno", label: "Grupo pequeño" },
            { href: "#bus", label: "En bus" },
            { href: "#otras", label: "Manrique, vino y más" },
            { href: "#maritimas", label: "Marítimas / Graciosa" },
            { href: "#faq", label: "FAQ" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ocean-deep ring-1 ring-sand-line transition hover:bg-sky-soft hover:ring-ocean/40"
            >
              {item.label}
            </a>
          ))}
        </div>
      </section>

      {small.length > 0 && (
        <section id="pequeno" className="mx-auto max-w-6xl px-4 pb-14 md:px-6">
          <div className="mb-6">
            <h2 className="font-display text-3xl text-ink">Grupo pequeño</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Máximo 8 personas · más cercanía con el guía
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {small.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </section>
      )}

      {large.length > 0 && (
        <section id="bus" className="border-y border-sand-line bg-sky-soft/60 py-14">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-6">
              <h2 className="font-display text-3xl text-ink">En bus</h2>
              <p className="mt-1 text-sm text-ink-muted">
                Hasta 50 personas · mejor precio · pago también el día del tour
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {large.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </section>
      )}

      {other.length > 0 && (
        <section id="otras" className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <div className="mb-6 max-w-2xl">
            <h2 className="font-display text-3xl text-ink">
              César Manrique, vino y a medida
            </h2>
            <p className="mt-2 text-ink-muted">
              Tours temáticos y excursión privada a la carta para familias y
              grupos.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {other.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </section>
      )}

      {maritime.length > 0 && (
        <section
          id="maritimas"
          className="border-y border-sand-line bg-sky-soft/60 py-14"
        >
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-6 max-w-2xl">
              <h2 className="font-display text-3xl text-ink">
                Excursiones marítimas · La Graciosa
              </h2>
              <p className="mt-2 text-ink-muted">
                I Love Graciosa, Sail, a tu aire y Costa a Costa.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {maritime.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="faq" className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:pb-20">
        <h2 className="font-display text-3xl text-ink">
          Preguntas frecuentes sobre las excursiones
        </h2>
        <div className="mt-8 space-y-3">
          {excursionFaqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl bg-white p-5 ring-1 ring-sand-line open:ring-ocean/30"
            >
              <summary className="cursor-pointer list-none font-semibold text-ink marker:content-none">
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
        <p className="mt-10 text-center text-sm text-ink-muted">
          ¿Llegas en crucero?{" "}
          <Link
            href="/cruceristas"
            className="font-semibold text-ocean hover:underline"
          >
            Mira las opciones para tu escala
          </Link>
        </p>
      </section>
    </>
  );
}
