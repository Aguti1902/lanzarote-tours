import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Bus, Languages, ShieldCheck, Users } from "lucide-react";
import { TourCard } from "@/components/TourCard";
import { getFeaturedTours, getSettings } from "@/lib/content";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLocale } from "@/i18n/get-locale";
import { localePath } from "@/i18n/path";

export const dynamic = "force-dynamic";

const awards = [
  { src: "/images/awards/turismo-seguro.jpg", alt: "Turismo Seguro frente al COVID-19" },
  { src: "/images/awards/lanzarote.png", alt: "Lanzarote" },
  { src: "/images/awards/centro-arte.jpg", alt: "Centro de arte y turismo de Lanzarote" },
  { src: "/images/awards/fundacion-cesar-manrique.svg", alt: "Fundación César Manrique" },
  { src: "/images/awards/volcanic-experience.jpg", alt: "Volcanic Experience" },
  { src: "/images/awards/sicted.jpg", alt: "SICTED Calidad Turística" },
  { src: "/images/awards/iqnet.jpg", alt: "IQNet Certified" },
  { src: "/images/awards/aenor.jpg", alt: "AENOR ISO-9001" },
  { src: "/images/awards/tripadvisor-excellence.svg", alt: "Tripadvisor Excellence" },
];

const advantageIcons = [ShieldCheck, Bus, Users, Languages, Leaf];

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const [featured, settings, dict] = await Promise.all([
    getFeaturedTours(),
    getSettings(),
    getDictionary(locale),
  ]);

  const awardLoop = [...awards, ...awards];
  const lp = (path: string) => localePath(locale, path);

  return (
    <>
      <section className="relative overflow-hidden bg-bg-deep text-white">
        <div className="grid min-h-[86vh] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 flex flex-col justify-center px-4 py-16 md:px-10 lg:px-16">
            <p className="animate-fade-up section-kicker !text-[#cfe8d4]">
              {dict.home.heroKicker}
            </p>
            <h1 className="animate-fade-up-delay mt-5 max-w-xl font-display text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.98] text-white">
              {settings.homeHeadline}
            </h1>
            <p className="animate-fade-up-delay mt-5 max-w-md text-lg leading-relaxed text-white/80 md:text-xl">
              {settings.tagline}
            </p>
            <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
              <Link href={lp("/excursiones")} className="btn-primary">
                {dict.home.ctaOffers}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={lp("/cruceristas")} className="btn-ghost">
                {dict.home.ctaCruise}
              </Link>
            </div>
          </div>
          <div className="relative min-h-[42vh] lg:min-h-full">
            <Image
              src={settings.homeHeroImage}
              alt="Lanzarote"
              fill
              priority
              className="hero-image object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-bg-deep/40" />
            <div className="absolute right-4 bottom-4 left-4 border-l-4 border-ocean bg-surface/95 p-4 text-ink shadow-[6px_6px_0_rgba(16,36,24,0.2)] md:right-8 md:bottom-8 md:left-auto md:max-w-sm">
              <p className="text-[11px] font-bold tracking-[0.18em] text-ocean-deep uppercase">
                {dict.home.heroCardKicker}
              </p>
              <p className="mt-2 font-display text-xl leading-snug">
                {dict.home.heroCardTitle}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden border-t border-white/10 bg-ocean py-2.5 text-sm text-white">
          <div className="marquee-track gap-12 px-4">
            {[0, 1].map((i) => (
              <p key={i} className="shrink-0 whitespace-nowrap tracking-wide">
                {dict.home.marquee}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-sand-line bg-surface py-8">
        <div className="marquee-track items-center gap-10 px-4 md:gap-14">
          {awardLoop.map((award, i) => (
            <div
              key={`${award.src}-${i}`}
              className="relative h-12 w-24 shrink-0 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 md:h-14 md:w-28"
            >
              <Image
                src={award.src}
                alt={award.alt}
                fill
                className="object-contain"
                sizes="112px"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <ol className="grid gap-px bg-sand-line sm:grid-cols-2 lg:grid-cols-5">
            {dict.home.advantages.map((label, index) => {
              const Icon = advantageIcons[index] || Users;
              return (
                <li
                  key={label}
                  className="bg-surface p-5"
                >
                  <span className="mb-4 flex h-11 w-11 items-center justify-center bg-ocean text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-[11px] font-bold tracking-[0.16em] text-ocean-deep uppercase">
                    0{index + 1}
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-snug text-ink">
                    {label}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-kicker">{dict.home.toursKicker}</p>
            <h2 className="section-title mt-3">{dict.home.toursTitle}</h2>
          </div>
          <Link
            href={lp("/excursiones")}
            className="inline-flex items-center gap-1 text-sm font-bold tracking-wide text-ocean-deep uppercase hover:text-ocean"
          >
            {dict.common.seeAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.slice(0, 3).map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-2 md:px-6 md:py-12">
        <article className="relative min-h-[360px] overflow-hidden text-white">
          <Image
            src="/images/home/traslados.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-bg-deep/70" />
          <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-end p-8">
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#cfe8d4] uppercase">
              {dict.home.transfersKicker}
            </p>
            <h2 className="mt-3 max-w-sm font-display text-3xl md:text-4xl">
              {dict.home.transfersTitle}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
              {settings.transferIntro}
            </p>
            <Link href={lp("/traslados")} className="btn-primary mt-6 w-fit">
              {dict.home.transfersCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
        <article className="relative min-h-[360px] overflow-hidden text-white">
          <Image
            src="/images/home/cruceros.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-ocean-deep/75" />
          <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-end p-8">
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#cfe8d4] uppercase">
              {dict.home.cruisesKicker}
            </p>
            <h2 className="mt-3 max-w-sm font-display text-3xl md:text-4xl">
              {dict.home.cruisesTitle}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
              {settings.cruiseIntro}
            </p>
            <Link href={lp("/cruceristas")} className="btn-primary mt-6 w-fit">
              {dict.home.cruisesCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-6">
          <div className="relative">
            <div className="absolute -top-4 -left-4 h-full w-full bg-ocean" />
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={settings.aboutImage}
                alt="LET"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div>
            <p className="section-kicker">{dict.home.agencyKicker}</p>
            <h2 className="section-title mt-3">{dict.home.agencyTitle}</h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              {settings.aboutLead}
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {dict.home.agencyBody}
            </p>
            <Link href={lp("/sobre-nosotros")} className="btn-primary mt-8">
              {dict.home.agencyCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-sand-line bg-surface py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-[0.9fr_1.1fr] md:px-6">
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <Image
              src="/images/home/lanzarote-mi-amor.png"
              alt="Lanzarote"
              fill
              className="object-contain drop-shadow-xl"
              sizes="400px"
            />
          </div>
          <div>
            <p className="section-kicker">{dict.home.islandKicker}</p>
            <h2 className="section-title mt-3">{dict.home.islandTitle}</h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              {dict.home.islandBody}
            </p>
            <Link href={lp("/excursiones")} className="btn-ghost-dark mt-8">
              {dict.home.islandCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
