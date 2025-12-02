"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const urlError = searchParams.get("error");
  const errorMsg =
    localError ||
    (urlError === "CredentialsSignin"
      ? "Correo o contraseña incorrectos."
      : null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setLocalError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // callbackUrl: si venías redirigido desde /admin, respétalo;
    // si entraste directo al login, manda a /admin igual.
    const callbackUrl =
      (searchParams.get("callbackUrl") as string | null) || "/admin";

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // 👈 IMPORTANTE
      callbackUrl,
    });

    console.log("[LOGIN signIn result]", result);

    setLoading(false);

    if (!result) {
      setLocalError("No se recibió respuesta del servidor.");
      return;
    }

    if (result.error) {
      setLocalError("Correo o contraseña incorrectos.");
      return;
    }

    if (result.ok && result.url) {
      router.push(result.url);
      router.refresh();
    } else {
      setLocalError("Ocurrió algo inesperado al iniciar sesión.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/80 border border-slate-800 p-8 shadow-xl">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Acceso administrador
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-200 mb-1"
            >
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/70"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-200 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/70"
            />
          </div>

          {errorMsg && (
            <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-md px-3 py-2">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium py-2.5 text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
