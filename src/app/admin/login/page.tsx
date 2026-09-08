"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("lt_admin", "1");
      router.push("/admin");
    } else {
      setError("La clave no coincide");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-deep px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border-l-4 border-ocean bg-surface p-8 shadow-[10px_10px_0_rgba(42,122,74,0.25)]"
      >
        <p className="text-[11px] font-bold tracking-[0.2em] text-ocean-deep uppercase">
          Mesa de la casa
        </p>
        <p className="mt-2 font-display text-3xl text-ink">Entrar</p>
        <p className="mt-1 text-sm text-ink-muted">
          Lanzarote Experience Tours
        </p>
        <label className="mt-6 block">
          <span className="mb-1 block text-sm font-medium">Clave</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-sand-line px-3 py-2.5 text-sm outline-none focus:border-ocean focus:ring-2 focus:ring-ocean/20"
            placeholder="••••••••"
            autoFocus
          />
        </label>
        {error && <p className="mt-2 text-sm text-coral">{error}</p>}
        <button
          type="submit"
          className="mt-5 w-full bg-ocean py-2.5 text-sm font-bold tracking-[0.12em] text-white uppercase hover:bg-ocean-deep"
        >
          Abrir mesa
        </button>
        <p className="mt-4 text-center text-xs text-ink-muted">
          Demo: clave <code>admin123</code>
        </p>
      </form>
    </div>
  );
}
