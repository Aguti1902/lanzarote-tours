"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, UserRound, X } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { useLocale } from "@/components/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();
  const { dict, href } = useLocale();

  const links = [
    { href: href("/sobre-nosotros"), path: "/sobre-nosotros", label: dict.nav.about },
    { href: href("/excursiones"), path: "/excursiones", label: dict.nav.excursions },
    { href: href("/traslados"), path: "/traslados", label: dict.nav.transfers },
    { href: href("/cruceristas"), path: "/cruceristas", label: dict.nav.cruises },
    { href: href("/casas"), path: "/casas", label: dict.nav.houses },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={`sticky top-0 z-50 border-b border-sand-line bg-surface/95 text-ink backdrop-blur-xl transition-shadow duration-300 ${
        scrolled ? "shadow-[0_12px_32px_rgba(16,36,24,0.08)]" : ""
      }`}
    >
      <div className="hidden border-b border-sand-line bg-bg-deep text-white sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase md:px-6">
          <p className="text-white/70">Lanzarote · grupos pequeños · solo en español</p>
          <a href="tel:+34646080585" className="text-white/85 hover:text-white">
            +34 646 08 05 85
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          href={href("/")}
          className="logo-plate relative block h-12 w-[158px] shrink-0 px-2 py-1.5 transition hover:opacity-90 md:h-[52px] md:w-[176px]"
        >
          <Image
            src="/images/brand/logo.png"
            alt="Lanzarote Experience Tours"
            fill
            className="object-contain object-left p-1.5"
            priority
            sizes="176px"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname.includes(link.path);
            return (
              <Link
                key={link.path}
                href={link.href}
                className={`px-3 py-2 text-[13px] font-semibold tracking-wide transition ${
                  active
                    ? "bg-ocean text-white"
                    : "text-ink/75 hover:bg-sky-soft hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden sm:block">
            <LanguageSwitcher tone="light" />
          </div>
          <Link
            href={href("/gestionar-reserva")}
            className="p-2.5 text-ink/80 transition hover:bg-sky-soft hover:text-ink"
            title={dict.nav.manageBooking}
            aria-label={dict.nav.manageBooking}
          >
            <UserRound className="h-5 w-5" />
          </Link>
          <Link
            href={href("/carrito")}
            className="relative p-2.5 text-ink/80 transition hover:bg-sky-soft hover:text-ink"
            title={dict.nav.cart}
            aria-label={dict.nav.cart}
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center bg-ocean px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="p-2.5 text-ink lg:hidden"
            aria-label={open ? "Close" : "Menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-sand-line bg-surface px-4 py-4 lg:hidden">
          <div className="mb-3">
            <LanguageSwitcher tone="light" />
          </div>
          <nav className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-sand-line px-1 py-3 text-base font-semibold text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={href("/contacto")}
              onClick={() => setOpen(false)}
              className="px-1 py-3 text-base font-semibold text-ocean-deep"
            >
              {dict.nav.contact}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
