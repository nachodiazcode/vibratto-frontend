"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Heart,
  Newspaper,
  Play,
  Sparkles,
  Users,
} from "lucide-react";
import api from "@/services/api";
import AppShell from "@/components/ui/AppShell";

type Json = Record<string, any>;

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.45 } }),
};

const ALBUM = { title: "Dreaming in Pastel", artist: "Miku Synthwave" };

export default function HomePage() {
  const [user, setUser] = useState<Json | null>(null);
  const [metrics, setMetrics] = useState<Json | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [recs, setRecs] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [collabs, setCollabs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      let token: string | null = null;
      try {
        token = localStorage.getItem("token");
        const raw = localStorage.getItem("user");
        if (token && raw) setUser(JSON.parse(raw));
      } catch {
        /* sin acceso a storage: se trata como invitado */
      }

      const auth = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
      // Cada petición falla por separado: una ruta caída no rompe el resto del home
      const [m, e, r, c, p] = await Promise.allSettled([
        token ? api.get("/metrics/me", auth) : Promise.reject(),
        token ? api.get("/events", auth) : Promise.reject(),
        token ? api.get("/recommendations", auth) : Promise.reject(),
        api.get("/collabs", auth),
        api.get("/blog/posts"),
      ]);

      if (m.status === "fulfilled") setMetrics(m.value.data);
      if (e.status === "fulfilled" && Array.isArray(e.value.data)) setEvents(e.value.data);
      if (r.status === "fulfilled" && Array.isArray(r.value.data)) setRecs(r.value.data);
      if (c.status === "fulfilled" && Array.isArray(c.value.data)) setCollabs(c.value.data);
      if (p.status === "fulfilled" && Array.isArray(p.value.data)) setPosts(p.value.data);
      setLoading(false);
    };
    load();
  }, []);

  const name = user?.nombre as string | undefined;
  const isGuest = !user;

  const stats = [
    { label: "Recomendaciones", value: recs.length, hint: "artistas y eventos para ti", icon: Sparkles, tone: "from-fuchsia-500/30 to-fuchsia-500/0", href: "/recomendaciones" },
    { label: "Likes esta semana", value: metrics?.likes ?? 0, hint: "en tus proyectos", icon: Heart, tone: "from-rose-500/30 to-rose-500/0", href: "/stats" },
    { label: "Colaboraciones", value: collabs.length, hint: "abiertas para unirte", icon: Users, tone: "from-violet-500/30 to-violet-500/0", href: "/colaboraciones" },
    { label: "Eventos", value: events.length, hint: "shows programados", icon: CalendarDays, tone: "from-cyan-400/30 to-cyan-400/0", href: "/eventos" },
  ];

  const firstName = name?.trim().split(/\s+/)[0];
  const card =
    "rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-xl";
  const link =
    "text-xs font-semibold text-cyan-200 hover:underline focus-visible:outline-2 focus-visible:outline-cyan-200";

  return (
    <AppShell>
      {/* Hero: texto a la izquierda, reproductor a la derecha */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        custom={0}
        className="relative grid gap-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-600/25 via-violet-600/15 to-cyan-500/20 p-5 shadow-[0_24px_70px_rgba(0,0,0,.4)] sm:p-7 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:p-8"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-400/20 blur-[80px]" />

        <div className="relative">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
            {isGuest ? "Estás explorando como invitado" : "La comunidad vibra contigo"}
          </p>
          <h1 className="text-balance text-[1.75rem] font-black leading-[1.08] tracking-[-0.03em] sm:text-4xl xl:text-[2.6rem]">
            {isGuest ? "Bienvenido a " : `Hola ${firstName}, `}
            <span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-200 bg-clip-text text-transparent">
              {isGuest ? "Vibratto" : "tu escenario te espera"}
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-200/75">
            Descubre artistas, crea colaboraciones y convierte una idea en la próxima canción que todos quieran escuchar.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              href="/colaboraciones"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-5 text-sm font-bold text-slate-950 shadow-[0_10px_34px_rgba(217,70,239,.35)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-white"
            >
              Buscar colaboración <ArrowRight size={16} />
            </Link>
            <Link
              href={isGuest ? "/register" : "/eventos"}
              className="inline-flex min-h-11 items-center rounded-full border border-white/20 bg-white/5 px-5 text-sm font-semibold backdrop-blur transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
            >
              {isGuest ? "Crear cuenta gratis" : "Ver eventos"}
            </Link>
          </div>
        </div>

        {/* Escuchando ahora */}
        <div className="relative flex items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
          <button
            type="button"
            aria-label={`Reproducir ${ALBUM.title}`}
            className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 shadow-[0_14px_40px_rgba(139,92,246,.4)] transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-white sm:h-24 sm:w-24"
          >
            <Play size={30} className="fill-white text-white" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/50">Escuchando ahora</p>
            <p className="mt-1 truncate font-bold">{ALBUM.title}</p>
            <p className="truncate text-sm text-white/55">{ALBUM.artist}</p>
            <div className="mt-3 flex h-6 items-end gap-1" aria-hidden="true">
              {[40, 70, 50, 90, 60, 80, 45, 75, 55, 85, 50, 65].map((h, i) => (
                <span
                  key={i}
                  className="w-1 animate-pulse rounded-full bg-gradient-to-t from-fuchsia-400 to-cyan-300"
                  style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Métricas */}
      <section aria-label="Resumen" className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(({ label, value, hint, icon: Icon, tone, href }, i) => (
          <motion.div key={label} initial="hidden" animate="show" variants={fade} custom={i + 1}>
            <Link
              href={href}
              className={`group relative flex h-full items-center gap-3 overflow-hidden p-3.5 transition hover:-translate-y-0.5 hover:border-white/25 focus-visible:outline-2 focus-visible:outline-fuchsia-300 sm:p-4 ${card}`}
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${tone}`} />
              <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10">
                <Icon size={19} className="text-white/85" />
              </span>
              <div className="relative min-w-0">
                <p className="text-2xl font-black leading-none tabular-nums">
                  {loading ? <span className="inline-block h-6 w-8 animate-pulse rounded bg-white/10" /> : value}
                </p>
                <p className="mt-1 truncate text-[13px] font-semibold">{label}</p>
                <p className="hidden truncate text-[11px] text-white/50 sm:block">{hint}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Colaboraciones */}
        <motion.section initial="hidden" animate="show" variants={fade} custom={5} className={`p-4 sm:p-5 ${card}`}>
          <header className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-[15px] font-bold">
              <Users size={17} className="text-violet-300" /> Colaboraciones abiertas
            </h2>
            <Link href="/colaboraciones" className={link}>Ver todas</Link>
          </header>
          {loading ? (
            <SkeletonRows />
          ) : collabs.length === 0 ? (
            <EmptyState
              icon={Users}
              title="Aún no hay colaboraciones"
              text="Sé el primero en proponer una y encuentra con quién crear."
              href="/colaboraciones"
              cta="Crear colaboración"
            />
          ) : (
            <ul className="divide-y divide-white/5">
              {collabs.slice(0, 4).map((c, i) => (
                <li key={c._id ?? i} className="flex items-center gap-3 py-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500/40 to-cyan-400/30 text-sm font-bold">
                    {(c.titulo || c.title || "C")[0].toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{c.titulo || c.title || "Colaboración"}</p>
                    <p className="truncate text-xs text-white/50">{c.descripcion || c.description || "Sin descripción"}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </motion.section>

        {/* Blog */}
        <motion.section initial="hidden" animate="show" variants={fade} custom={6} className={`p-4 sm:p-5 ${card}`}>
          <header className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-[15px] font-bold">
              <Newspaper size={17} className="text-cyan-300" /> Del blog
            </h2>
            <Link href="/blog" className={link}>Ir al blog</Link>
          </header>
          {loading ? (
            <SkeletonRows />
          ) : posts.length === 0 ? (
            <EmptyState
              icon={Newspaper}
              title="Todavía no hay publicaciones"
              text="Pronto verás aquí historias y novedades de la comunidad."
              href="/blog"
              cta="Ir al blog"
            />
          ) : (
            <div className="grid gap-2.5">
              {posts.slice(0, 3).map((p, i) => (
                <article key={p._id ?? i} className="rounded-xl border border-white/5 bg-white/[0.03] p-3.5">
                  <p className="line-clamp-1 text-sm font-semibold">{p.titulo || p.title || "Publicación"}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-white/50">{p.contenido || p.content || ""}</p>
                </article>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </AppShell>
  );
}

function SkeletonRows() {
  return (
    <div className="space-y-3" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="h-9 w-9 animate-pulse rounded-xl bg-white/10" />
          <div className="flex-1 space-y-2">
            <span className="block h-3 w-2/3 animate-pulse rounded bg-white/10" />
            <span className="block h-2.5 w-1/2 animate-pulse rounded bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  text,
  href,
  cta,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  text: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-5 py-7 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.06]">
        <Icon size={20} className="text-white/60" />
      </span>
      <p className="text-sm font-semibold">{title}</p>
      <p className="max-w-xs text-xs text-white/50">{text}</p>
      <Link
        href={href}
        className="mt-1 inline-flex min-h-10 items-center rounded-full border border-white/15 bg-white/5 px-4 text-xs font-semibold text-fuchsia-100 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-fuchsia-300"
      >
        {cta} →
      </Link>
    </div>
  );
}
