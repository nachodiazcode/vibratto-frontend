"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BadgePercent,
  BarChart3,
  Bell,
  CalendarDays,
  Cast,
  Heart,
  Home,
  LogOut,
  Menu,
  Music2,
  Newspaper,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_GROUPS = [
  {
    title: "Explorar",
    items: [
      { label: "Inicio", icon: Home, href: "/home" },
      { label: "Artistas", icon: Music2, href: "/artistas" },
      { label: "Colaboraciones", icon: Users, href: "/colaboraciones" },
      { label: "Eventos", icon: CalendarDays, href: "/eventos" },
      { label: "Streaming", icon: Cast, href: "/stream" },
      { label: "Blog", icon: Newspaper, href: "/blog" },
    ],
  },
  {
    title: "Para ti",
    items: [
      { label: "Recomendaciones", icon: Sparkles, href: "/recomendaciones" },
      { label: "Favoritos", icon: Heart, href: "/favoritos" },
      { label: "Reseñas", icon: Star, href: "/reseñas" },
      { label: "Estadísticas", icon: BarChart3, href: "/stats" },
      { label: "Notificaciones", icon: Bell, href: "/notificaciones" },
    ],
  },
  {
    title: "Tienda",
    items: [
      { label: "Merch", icon: Store, href: "/merch" },
      { label: "Carrito", icon: ShoppingCart, href: "/carrito" },
      { label: "Premium", icon: BadgePercent, href: "/premium" },
    ],
  },
];

// Accesos de la barra inferior en móvil
const BOTTOM_NAV = [
  { label: "Inicio", icon: Home, href: "/home" },
  { label: "Eventos", icon: CalendarDays, href: "/eventos" },
  { label: "Artistas", icon: Music2, href: "/artistas" },
  { label: "Perfil", icon: UserCircle, href: "/perfil" },
];

type StoredUser = { nombre?: string; premium?: boolean } | null;

function SidebarContent({
  user,
  pathname,
  onNavigate,
  onLogout,
}: {
  user: StoredUser;
  pathname: string;
  onNavigate?: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <Link
        href="/home"
        onClick={onNavigate}
        className="mb-6 flex items-center gap-3 px-2 text-sm font-semibold tracking-[0.22em] text-white/90"
      >
        <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-white/10 shadow-[0_0_28px_rgba(217,70,239,.22)]">
          <Music2 size={20} className="text-fuchsia-300" />
        </span>
        VIBRATTO
      </Link>

      <nav className="flex-1 space-y-6 overflow-y-auto pr-1">
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.items.map(({ label, icon: Icon, href }) => {
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                        active
                          ? "bg-gradient-to-r from-fuchsia-500/25 to-cyan-400/10 text-white shadow-[inset_0_0_0_1px_rgba(240,171,252,.25)]"
                          : "text-white/65 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={active ? "text-fuchsia-300" : "text-white/50 group-hover:text-cyan-200"}
                      />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-4 border-t border-white/10 pt-4">
        <div className="mb-3 flex items-center gap-3 px-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-sm font-bold text-slate-950">
            {(user?.nombre?.[0] || "I").toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user?.nombre || "Invitado"}</p>
            <p className="text-xs text-white/45">{user ? (user.premium ? "Premium" : "Cuenta gratuita") : "Modo invitado"}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-300/90 transition hover:bg-rose-500/10"
        >
          <LogOut size={18} />
          {user ? "Cerrar sesión" : "Salir"}
        </button>
      </div>
    </div>
  );
}

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<StoredUser>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch {
      /* sin acceso a storage */
    }
    router.push("/login");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#070612] text-white">
      {/* Fondo ambiental, igual que el login */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-32 -top-28 h-[30rem] w-[30rem] rounded-full bg-fuchsia-600/20 blur-[120px]" />
        <div className="absolute -bottom-44 right-[-6rem] h-[34rem] w-[34rem] rounded-full bg-cyan-500/15 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      </div>

      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/10 bg-white/[0.035] p-5 backdrop-blur-2xl lg:block">
        <SidebarContent user={user} pathname={pathname} onLogout={logout} />
      </aside>

      {/* Barra superior móvil */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#070612]/80 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link href="/home" className="flex items-center gap-2 text-xs font-semibold tracking-[0.22em]">
          <span className="grid h-8 w-8 place-items-center rounded-xl border border-white/15 bg-white/10">
            <Music2 size={16} className="text-fuchsia-300" />
          </span>
          VIBRATTO
        </Link>
        <button
          aria-label="Abrir menú"
          onClick={() => setOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Drawer móvil */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-white/10 bg-[#0c0a1c] p-5 lg:hidden"
            >
              <button
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5"
              >
                <X size={18} />
              </button>
              <SidebarContent
                user={user}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
                onLogout={logout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="relative z-10 px-4 pb-28 pt-6 sm:px-8 lg:ml-64 lg:px-12 lg:pb-12 lg:pt-10">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </main>

      {/* Navegación inferior móvil */}
      <nav className="fixed inset-x-3 bottom-3 z-30 flex justify-around rounded-2xl border border-white/10 bg-[#0c0a1c]/90 p-1.5 shadow-[0_10px_40px_rgba(0,0,0,.5)] backdrop-blur-xl lg:hidden">
        {BOTTOM_NAV.map(({ label, icon: Icon, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 text-[11px] transition ${
                active ? "bg-white/10 text-fuchsia-200" : "text-white/55"
              }`}
            >
              <Icon size={19} />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
