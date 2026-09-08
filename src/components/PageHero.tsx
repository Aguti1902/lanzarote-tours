import Image from "next/image";

export function PageHero({
  image,
  title,
  subtitle,
  eyebrow,
  compact = false,
}: {
  image: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  compact?: boolean;
}) {
  return (
    <section
      className={`relative overflow-hidden bg-bg-deep ${
        compact ? "min-h-[38vh]" : "min-h-[52vh]"
      }`}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        className="hero-image object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-deep/88 via-bg-deep/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/75 via-transparent to-bg-deep/20" />
      <div
        className={`relative mx-auto flex max-w-6xl items-end px-4 md:px-6 ${
          compact ? "min-h-[38vh] pb-10 pt-20" : "min-h-[52vh] pb-14 pt-24"
        }`}
      >
        <div className="max-w-3xl border-l-4 border-ocean bg-surface/95 p-6 text-ink shadow-[8px_8px_0_rgba(16,36,24,0.18)] md:p-8">
          {eyebrow && (
            <p className="animate-fade-up mb-3 text-[11px] font-bold tracking-[0.22em] text-ocean-deep uppercase">
              {eyebrow}
            </p>
          )}
          <h1 className="animate-fade-up-delay font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="animate-fade-up-delay-2 mt-3 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
