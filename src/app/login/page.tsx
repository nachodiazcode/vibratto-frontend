"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { AxiosError } from "axios";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Headphones,
  Lock,
  Mail,
  Music2,
  Sparkles,
} from "lucide-react";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import api from "@/services/api";

const particles = [
  { left: "7%", top: "18%", delay: 0.2, size: 5 },
  { left: "15%", top: "72%", delay: 1.1, size: 3 },
  { left: "28%", top: "10%", delay: 0.7, size: 4 },
  { left: "44%", top: "84%", delay: 1.8, size: 6 },
  { left: "59%", top: "12%", delay: 1.3, size: 3 },
  { left: "72%", top: "78%", delay: 0.4, size: 4 },
  { left: "86%", top: "24%", delay: 2, size: 5 },
  { left: "94%", top: "63%", delay: 0.9, size: 3 },
];

const equalizerBars = [14, 28, 20, 38, 26, 46, 32, 20, 36, 24, 42, 18];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!isValidEmail(email) || password.length < 4) {
      setError("Revisa tu correo y escribe una contraseña válida.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true },
      );

      const token = response.data?.token;
      const user = response.data?.usuario;

      if (!token || !user) {
        setError("La respuesta del servidor es inválida.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/home");
    } catch (requestError: unknown) {
      const axiosError = requestError as AxiosError<{ mensaje?: string }>;
      setError(
        axiosError.response?.data?.mensaje ||
          axiosError.message ||
          "No pudimos conectar con el escenario. Intenta nuevamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070612] px-4 py-6 text-white sm:px-7 lg:flex lg:items-center lg:py-8">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-32 -top-28 h-[30rem] w-[30rem] rounded-full bg-fuchsia-600/25 blur-[120px]"
          animate={{ x: [0, 80, 10], y: [0, 45, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-44 right-[-6rem] h-[34rem] w-[34rem] rounded-full bg-cyan-500/20 blur-[130px]"
          animate={{ x: [0, -70, 0], y: [0, -55, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />

        {particles.map((particle, index) => (
          <motion.span
            key={`${particle.left}-${particle.top}`}
            className="absolute rounded-full bg-white shadow-[0_0_14px_3px_rgba(255,255,255,.6)]"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -18, 0] }}
            transition={{
              duration: 3.5 + index * 0.25,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <Link
        href="/"
        className="absolute left-7 top-7 z-30 flex items-center gap-3 text-sm font-semibold tracking-[0.22em] text-white/90 sm:left-10 sm:top-9"
      >
        <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-white/10 shadow-[0_0_28px_rgba(217,70,239,.22)] backdrop-blur-xl">
          <Music2 size={20} className="text-fuchsia-300" />
        </span>
        VIBRATTO
      </Link>

      <section className="relative z-10 mx-auto grid w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] shadow-[0_40px_120px_rgba(0,0,0,.55)] backdrop-blur-2xl lg:grid-cols-[1.05fr_.95fr]">
        <motion.aside
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden min-h-[760px] overflow-hidden lg:block"
        >
          <Image
            src="/personajes/nancy.png"
            alt="Nancy tocando guitarra bajo luces de concierto"
            fill
            priority
            sizes="(min-width: 1024px) 54vw, 0vw"
            className="scale-[1.035] object-cover object-[center_32%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090716] via-[#090716]/10 to-[#100720]/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#100c20]/70" />

          <motion.div
            className="absolute left-[11%] top-[18%] rounded-2xl border border-white/15 bg-black/25 px-4 py-3 backdrop-blur-xl"
            animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles size={16} className="text-yellow-200" />
              Tu sonido. Tu gente.
            </div>
          </motion.div>

          <motion.div
            className="absolute right-[8%] top-[39%] grid h-14 w-14 place-items-center rounded-full border border-cyan-200/25 bg-cyan-300/10 text-cyan-100 backdrop-blur-xl"
            animate={{ y: [0, 14, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Headphones size={24} />
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 p-10 xl:p-14">
            <div className="mb-7 flex h-12 items-end gap-1.5" aria-hidden="true">
              {equalizerBars.map((height, index) => (
                <motion.span
                  key={`${height}-${index}`}
                  className="w-1.5 rounded-full bg-gradient-to-t from-fuchsia-400 to-cyan-300 shadow-[0_0_10px_rgba(34,211,238,.45)]"
                  animate={{ height: [height * 0.45, height, height * 0.62] }}
                  transition={{
                    duration: 0.85 + (index % 4) * 0.18,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/80">
              La comunidad vibra contigo
            </p>
            <h1 className="max-w-xl text-5xl font-black leading-[1.02] tracking-[-0.045em] xl:text-6xl">
              Donde tu música
              <span className="block bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-200 bg-clip-text text-transparent">
                encuentra escenario.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-200/75">
              Descubre artistas, crea colaboraciones y convierte una idea en la próxima canción que todos quieran escuchar.
            </p>
          </div>
        </motion.aside>

        <motion.article
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-h-[760px] items-center px-6 py-24 sm:px-12 lg:px-14 xl:px-20"
        >
          <div className="mx-auto w-full max-w-md">
            <div className="mb-9">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-100"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fuchsia-300 shadow-[0_0_10px_2px_rgba(240,171,252,.65)]" />
                Tu escenario te espera
              </motion.div>
              <h2 className="text-4xl font-black tracking-[-0.035em] sm:text-5xl">
                Qué bueno
                <span className="block text-white/45">tenerte de vuelta.</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                Entra a tu cuenta y vuelve a conectar con la música.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="mb-5 overflow-hidden rounded-2xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form className="space-y-5" onSubmit={handleLogin}>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Correo electrónico
                </span>
                <span className="group flex items-center rounded-2xl border border-white/10 bg-white/[0.055] px-4 transition duration-300 focus-within:border-fuchsia-300/60 focus-within:bg-white/[0.08] focus-within:shadow-[0_0_30px_rgba(217,70,239,.12)]">
                  <Mail size={19} className="shrink-0 text-slate-500 transition group-focus-within:text-fuchsia-300" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="tu@correo.com"
                    autoComplete="email"
                    className="w-full bg-transparent px-3 py-4 text-[15px] text-white outline-none placeholder:text-slate-600"
                    required
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Contraseña
                </span>
                <span className="group flex items-center rounded-2xl border border-white/10 bg-white/[0.055] px-4 transition duration-300 focus-within:border-cyan-300/60 focus-within:bg-white/[0.08] focus-within:shadow-[0_0_30px_rgba(34,211,238,.1)]">
                  <Lock size={19} className="shrink-0 text-slate-500 transition group-focus-within:text-cyan-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Tu contraseña"
                    autoComplete="current-password"
                    className="w-full bg-transparent px-3 py-4 text-[15px] text-white outline-none placeholder:text-slate-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="rounded-lg p-1 text-slate-500 transition hover:bg-white/10 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </span>
              </label>

              <div className="flex items-center justify-between gap-4 text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-slate-400">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/20 bg-white/5 accent-fuchsia-400"
                  />
                  Recuérdame
                </label>
                <button type="button" className="font-medium text-cyan-200 transition hover:text-cyan-100">
                  ¿Olvidaste tu clave?
                </button>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={isLoading ? undefined : { scale: 1.015 }}
                whileTap={isLoading ? undefined : { scale: 0.985 }}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 px-5 py-4 font-bold shadow-[0_15px_45px_rgba(139,92,246,.28)] transition disabled:cursor-wait disabled:opacity-70"
              >
                <motion.span
                  className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/25 blur-md"
                  animate={{ x: ["0%", "500%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
                />
                {isLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                    Abriendo el escenario…
                  </>
                ) : (
                  <>
                    Entrar a Vibratto
                    <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
              <span className="text-xs uppercase tracking-[0.2em] text-slate-600">o continúa con</span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
            </div>

            <GoogleSignInButton
              onSuccess={(token, user) => {
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                router.push("/home");
              }}
              onError={setError}
            />

            <div className="mt-7 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-7 text-sm sm:flex-row">
              <p className="text-slate-500">
                ¿Aún no tienes cuenta?{" "}
                <Link href="/register" className="font-semibold text-fuchsia-200 transition hover:text-fuchsia-100">
                  Créala gratis
                </Link>
              </p>
              <button
                type="button"
                onClick={() => router.push("/home")}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 transition hover:text-cyan-200"
              >
                Entrar como invitado
              </button>
            </div>
          </div>
        </motion.article>
      </section>
    </main>
  );
}
