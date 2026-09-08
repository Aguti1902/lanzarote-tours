"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Star, Users } from "lucide-react";
import type { Tour } from "@/types";
import { formatPrice, groupSizeLabel } from "@/lib/format";
import { useLocale } from "@/components/LocaleProvider";

export function TourCard({ tour }: { tour: Tour }) {
  const { dict, href } = useLocale();

  return (
    <Link
      href={href(`/excursiones/${tour.slug}`)}
      className="card-lift group flex flex-col overflow-hidden bg-surface shadow-[4px_4px_0_rgba(16,36,24,0.08)] ring-1 ring-sand-line"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/55 via-transparent to-transparent" />
        {tour.groupSize && (
          <span className="absolute top-3 left-3 bg-surface px-2.5 py-1 text-[11px] font-bold tracking-wide text-ocean-deep uppercase">
            {groupSizeLabel(tour.groupSize)}
          </span>
        )}
        <span className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center bg-ocean text-white transition group-hover:bg-bg-deep">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
          {tour.shortTitle}
        </h3>

        <div className="mt-2 mb-2 flex items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1 font-bold text-ink">
            <Star className="h-3.5 w-3.5 fill-rating text-rating" />
            {tour.rating.toFixed(1)}
          </span>
          <span className="text-ink-muted">({tour.reviewCount})</span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-ink-muted">
          {tour.summary}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          <span className="inline-flex items-center gap-1 bg-sky-soft px-2.5 py-1">
            <Clock className="h-3.5 w-3.5 text-ocean" />
            {tour.duration}
          </span>
          {tour.maxGroup && (
            <span className="inline-flex items-center gap-1 bg-sky-soft px-2.5 py-1">
              <Users className="h-3.5 w-3.5 text-ocean" />
              {dict.common.max} {tour.maxGroup}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-sand-line pt-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] text-ink-muted uppercase">
              {dict.common.from}
            </p>
            <p className="font-display text-2xl font-semibold text-ocean-deep">
              {formatPrice(tour.priceAdult)}
            </p>
          </div>
          <span className="text-[12px] font-bold tracking-[0.12em] text-ink uppercase transition group-hover:text-ocean">
            {dict.common.book}
          </span>
        </div>
      </div>
    </Link>
  );
}
