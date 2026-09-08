import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Eye, HeartHandshake, Target } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { getSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Lanzarote Tours: empresa familiar de Lanzarote. Misión, visión y valores. Excursiones y traslados con guía local.",
};

export default async function SobreNosotrosPage() {
  const settings = await getSettings();
  const paragraphs = settings.aboutText.split("\n\n").filter(Boolean);
  const values = settings.aboutValues
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);

  return (
    <>
      <PageHero
        image={settings.aboutImage}
        eyebrow="Quiénes somos"
        title={settings.aboutTitle}
        subtitle={settings.aboutLead}
      />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center md:px-6 md:py-20">
        <div>
          <p className="font-display text-3xl leading-snug text-ink md:text-4xl">
            {paragraphs[0] || settings.aboutLead}
          </p>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
            {paragraphs.slice(1).map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-sand-line md:aspect-[5/6]">
          <Image
            src={settings.aboutImageSecondary}
            alt="Costa y paisaje de Lanzarote"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="border-y border-sand-line bg-sky-soft/70 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2 md:px-6">
          <div className="rounded-2xl bg-white p-7 ring-1 ring-sand-line">
            <Target className="h-8 w-8 text-ocean" />
            <h2 className="mt-4 font-display text-2xl text-ink">Misión</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {settings.aboutMission}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-7 ring-1 ring-sand-line">
            <Eye className="h-8 w-8 text-ocean" />
            <h2 className="mt-4 font-display text-2xl text-ink">Visión</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {settings.aboutVision}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <h2 className="font-display text-3xl text-ink md:text-4xl">
          Nuestros valores
        </h2>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Como parte de nuestra cultura empresarial, en Lanzarote Tours nos
          regimos por valores que guían nuestras acciones y decisiones diarias.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <li
              key={value}
              className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-sand-line"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ocean" />
              <span className="text-sm font-medium text-ink">{value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 md:px-6 md:pb-20">
        <div className="overflow-hidden rounded-3xl bg-bg-deep text-white md:grid md:grid-cols-2">
          <div className="relative min-h-[260px]">
            <Image
              src={settings.aboutImage}
              alt="Paisaje volcánico"
              fill
              className="object-cover opacity-80"
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-10">
            <HeartHandshake className="h-8 w-8 text-sky-mist" />
            <h2 className="mt-4 font-display text-3xl">Nuestro compromiso</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80 md:text-base">
              {settings.aboutPromise}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/excursiones"
                className="rounded-md bg-ocean px-5 py-2.5 text-sm font-semibold text-white hover:bg-coral-hover"
              >
                Ver excursiones
              </Link>
              <Link
                href="/traslados"
                className="rounded-md border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                Ver traslados
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
