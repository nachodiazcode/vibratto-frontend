// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email) || password.length < 4) {
      setError("Por favor ingresa credenciales válidas.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3950/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const token = res.data?.token;
      const user = res.data?.usuario;

      if (!token || !user) {
        setError("La respuesta del servidor es inválida.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/home");
    } catch (err: any) {
      setError(
        err?.response?.data?.mensaje ||
        err?.message ||
        "Error de red o del servidor"
      );
    }
  };

  const inputClass = (valid: boolean) =>
    `transition-all duration-300 bg-white/5 placeholder-slate-300 pl-10 pr-4 py-3 rounded-md w-full focus:outline-none border-2 ` +
    (valid ? "border-blue-300" : "border-pink-300");

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0e1a2b] via-[#1a2c44] to-[#263d58] text-white flex items-center relative overflow-hidden py-32">
      {/* 🎨 Blobs decorativos */}
      <div className="absolute w-[400px] h-[400px] bg-pink-300/20 rounded-full blur-3xl top-[-120px] left-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-indigo-300/30 rounded-full blur-2xl bottom-[-60px] right-[-80px]" />
      <div className="absolute w-[250px] h-[250px] bg-sky-300/10 rounded-full blur-2xl top-[45%] left-[50%] translate-x-[-50%]" />

      <main className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-24 z-10 px-6">
        {/* 🎸 Ilustración + texto */}
        <aside className="w-full md:w-1/2 text-center md:text-left space-y-8">
          <img
            src="/personajes/nancy.png"
            alt="Nancy tocando guitarra"
            className="w-[420px] mx-auto md:mx-0 drop-shadow-2xl animate-floatY"
          />
          <h2 className="text-5xl font-bold leading-tight">
            Bienvenido a <span className="text-blue-300">Vibratto</span>
          </h2>
          <p className="text-slate-300 text-base max-w-md mx-auto md:mx-0">
            Explora artistas adorables, comparte tu música y haz comunidad con un solo click.
          </p>
        </aside>

        {/* 📥 Login Form */}
        <article className="relative w-full md:w-1/2 max-w-xl">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute -top-16 left-0 right-0 bg-red-500/80 text-white text-sm py-3 px-4 rounded-xl shadow-lg border border-red-400 z-20 text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.section
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-xl px-14 py-20 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(147,197,253,0.15)]"
          >
            <header className="mb-10 text-center">
              <h1 className="text-3xl font-bold drop-shadow">
                Inicia sesión y entra al mundo azul pastel 🎶
              </h1>
            </header>

            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
              <label className="relative block">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass(email === "" || isValidEmail(email))}
                  required
                />
              </label>

              <label className="relative block">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass(password.length >= 4)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </label>

              <button
                type="submit"
                className="bg-blue-400/80 hover:bg-blue-400/90 active:scale-95 transition-all duration-200 py-3 rounded-md font-semibold text-white mt-2 shadow-md shadow-blue-300/30"
              >
                Iniciar sesión
              </button>
            </form>

            <footer className="mt-8">
              <div className="flex justify-between text-xs text-white/40">
                <a href="#" className="hover:underline">¿Olvidaste tu contraseña?</a>
                <a href="#" className="hover:underline">¡Crea una aquí!</a>
              </div>

              <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-white/10" />
                <span className="px-4 text-sm text-white/40">o</span>
                <div className="flex-grow h-px bg-white/10" />
              </div>

              <button
                type="button"
                onClick={() => alert("Google login")}
                className="flex items-center justify-center gap-3 w-full border border-white/20 hover:border-white/40 transition-all duration-200 py-3 rounded-md bg-white/5 text-white hover:bg-white/10"
              >
                <FcGoogle size={22} /> Iniciar sesión con Google
              </button>

              <button
                type="button"
                onClick={() => router.push("/maincontent")}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-md bg-gradient-to-r from-sky-400 to-indigo-400 text-white hover:brightness-110 transition-all duration-300 shadow-md shadow-indigo-400/30 animate-glow"
              >
                <span className="text-sm">🎧 Entrar como invitado</span>
              </button>
            </footer>
          </motion.section>
        </article>
      </main>

      <style jsx global>{`
        @keyframes floatY {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }

        .animate-floatY {
          animation: floatY 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
