"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Banknote,
  BarChart3,
  BookOpen,
  Bus,
  CalendarDays,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Map,
  Settings,
} from "lucide-react";

const nav = [
  { href: "/admin", label: "Mesa de trabajo", icon: LayoutDashboard },
  { href: "/admin/reservas", label: "Plazas", icon: CalendarDays },
  { href: "/admin/cobros-efectivo", label: "Efectivo", icon: Banknote },
  { href: "/admin/facturas", label: "Facturas", icon: FileText },
  { href: "/admin/estadisticas", label: "Números", icon: BarChart3 },
  { href: "/admin/excursiones", label: "Salidas", icon: Map },
  { href: "/admin/traslados", label: "Traslados", icon: Bus },
  { href: "/admin/blog", label: "Cuaderno", icon: BookOpen },
  { href: "/admin/ajustes", label: "Casa", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    const ok = localStorage.getItem("lt_admin") === "1";
    if (!ok && !isLogin) {
      router.replace("/admin/login");
    } else {
      setReady(true);
    }
  }, [isLogin, router, pathname]);

  if (isLogin) return <>{children}</>;
  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-ink-muted">
        Abriendo la mesa…
      </div>
    );
  }

  function logout() {
    localStorage.removeItem("lt_admin");
    router.push("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="hidden w-64 shrink-0 flex-col bg-bg-deep text-white md:flex">
        <div className="border-b border-white/10 px-5 py-5">
          <div className="relative mb-2 h-10 w-[140px]">
            <Image
              src="/images/brand/logo.png"
              alt="LET"
              fill
              className="object-contain object-left"
              sizes="140px"
            />
          </div>
          <p className="text-[11px] font-bold tracking-[0.16em] text-[#cfe8d4] uppercase">
            Mesa de la casa
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2.5 text-sm ${
                  active
                    ? "bg-ocean text-white"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/"
            target="_blank"
            className="mt-auto flex items-center gap-2 px-3 py-2.5 text-sm text-white/50 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            Ver la web
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2.5 text-left text-sm text-white/50 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Cerrar
          </button>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-sand-line bg-surface px-4 py-3 md:px-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-bold ${
                  pathname.startsWith(item.href) ? "text-ocean" : "text-ink-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={logout}
              className="ml-auto text-xs text-ink-muted"
            >
              Salir
            </button>
          </div>
          <p className="hidden text-sm text-ink-muted md:block">
            Plazas, efectivo, facturas, cuaderno y números de la casa
          </p>
        </header>
        <div className="flex-1 p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}
