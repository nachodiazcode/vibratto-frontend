import Link from "next/link";
import { Sparkles } from "lucide-react";
import AppShell from "@/components/ui/AppShell";

type SectionPlaceholderProps = {
  title: string;
};

export default function SectionPlaceholder({ title }: SectionPlaceholderProps) {
  return (
    <AppShell>
      <section className="mx-auto mt-6 flex max-w-2xl flex-col items-center rounded-[2rem] border border-white/10 bg-white/[0.045] px-6 py-16 text-center shadow-[0_30px_90px_rgba(0,0,0,.4)] backdrop-blur-xl sm:px-10 sm:py-20">
        <span className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500/40 to-cyan-400/30 text-white">
          <Sparkles size={28} />
        </span>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-md text-sm text-slate-300/80 sm:text-base">
          Esta sección de Vibratto estará disponible muy pronto.
        </p>
        <Link
          href="/home"
          className="mt-8 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:brightness-110"
        >
          Volver al inicio
        </Link>
      </section>
    </AppShell>
  );
}
