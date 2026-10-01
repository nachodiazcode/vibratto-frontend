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

  return (
    <AppShell>
      {/* Hero */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        custom={0}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-600/25 via-violet-600/15 to-cyan-500/20 p-6 shadow-[0_30px_90px_rgba(0,0,0,.45)] sm:p-10"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cyan-400/20 blur-[80px]" />
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-200/80">
          {isGuest ? "Estás explorando como invitado" : "La comunidad vibra contigo"}
        </p>
        <h1 className="max-w-2xl text-3xl font-black leading-[1.05] tracking-[-0.035em] sm:text-5xl">
          {isGuest ? "Bienvenido a " : `Hola ${name}, `}
          <span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-200 bg-clip-text text-transparent">
            {isGuest ? "Vibratto" : "tu escenario te espera"}
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200/75 sm:text-base">
          Descubre artistas, crea colaboraciones y convierte una idea en la próxima canción que todos quieran escuchar.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/colaboraciones"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_10px_40px_rgba(217,70,239,.35)] transition hover:brightness-110"
          >
            Buscar colaboración <ArrowRight size={16} />
          </Link>
          {isGuest ? (
            <Link
              href="/register"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white/10"
            >
              Crear cuenta gratis
            </Link>
          ) : (
            <Link
              href="/eventos"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white/10"
            >
              Ver eventos
            </Link>
          )}
        </div>
      </motion.section>

      {/* Métricas */}
      <section className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, hint, icon: Icon, tone, href }, i) => (
          <motion.div key={label} initial="hidden" animate="show" variants={fade} custom={i + 1}>
            <Link
              href={href}
              className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/25 sm:p-5"
            >
              <div className={`pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b ${tone}`} />
              <Icon size={20} className="relative text-white/80" />
              <p className="relative mt-4 text-3xl font-black tabular-nums">
                {loading ? <span className="inline-block h-8 w-10 animate-pulse rounded bg-white/10" /> : value}
              </p>
              <p className="relative mt-1 text-sm font-semibold">{label}</p>
              <p className="relative text-xs text-white/50">{hint}</p>
            </Link>
          </motion.div>
        ))}
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Colaboraciones */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fade}
          custom={5}
          className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl lg:col-span-2"
        >
          <header className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-bold">
              <Users size={18} className="text-violet-300" /> Colaboraciones abiertas
            </h2>
            <Link href="/colaboraciones" className="text-xs font-semibold text-cyan-200 hover:underline">
              Ver todas
            </Link>
          </header>
          {collabs.length === 0 ? (
            <EmptyState text="Aún no hay colaboraciones. ¡Sé el primero en crear una!" href="/colaboraciones" cta="Explorar" />
          ) : (
            <ul className="divide-y divide-white/5">
              {collabs.slice(0, 4).map((c, i) => (
                <li key={c._id ?? i} className="flex items-center gap-3 py-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500/40 to-cyan-400/30 text-sm font-bold">
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

        {/* Escuchando ahora */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fade}
          custom={6}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-violet-600/25 to-transparent p-5 backdrop-blur-xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">Escuchando ahora</p>
          <div className="mt-4 grid aspect-square w-full max-w-[220px] place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 shadow-[0_20px_60px_rgba(139,92,246,.4)]">
            <Play size={44} className="fill-white text-white" />
          </div>
          <p className="mt-4 font-bold">{ALBUM.title}</p>
          <p className="text-sm text-white/55">{ALBUM.artist}</p>
          <div className="mt-4 flex h-8 items-end gap-1" aria-hidden="true">
            {[40, 70, 50, 90, 60, 80, 45, 75, 55, 85, 50, 65].map((h, i) => (
              <span
                key={i}
                className="w-1.5 animate-pulse rounded-full bg-gradient-to-t from-fuchsia-400 to-cyan-300"
                style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }}
              />
            ))}
          </div>
        </motion.section>
      </div>

      {/* Último post */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fade}
        custom={7}
        className="mt-4 rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl"
      >
        <header className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-bold">
            <Newspaper size={18} className="text-cyan-300" /> Del blog
          </h2>
          <Link href="/blog" className="text-xs font-semibold text-cyan-200 hover:underline">
            Ir al blog
          </Link>
        </header>
        {posts.length === 0 ? (
          <EmptyState text="Todavía no hay publicaciones." href="/blog" cta="Ir al blog" />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <article key={p._id ?? i} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                <p className="line-clamp-1 text-sm font-semibold">{p.titulo || p.title || "Publicación"}</p>
                <p className="mt-1 line-clamp-2 text-xs text-white/50">{p.contenido || p.content || ""}</p>
              </article>
            ))}
          </div>
        )}
      </motion.section>
    </AppShell>
  );
}

function EmptyState({ text, href, cta }: { text: string; href: string; cta: string }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-white/55">{text}</p>
      <Link href={href} className="shrink-0 text-sm font-semibold text-fuchsia-200 hover:underline">
        {cta} →
      </Link>
    </div>
  );
}
