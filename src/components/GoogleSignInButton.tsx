"use client";

import { useEffect, useRef, useState } from "react";
import type { AxiosError } from "axios";
import api from "@/services/api";

/** ID de cliente de OAuth (público). Se puede sobrescribir con NEXT_PUBLIC_GOOGLE_CLIENT_ID. */
const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "716941408216-nl1k8uh10m3qrt0p0usse2fbl6nb8npe.apps.googleusercontent.com";

const GSI_SRC = "https://accounts.google.com/gsi/client";

interface GoogleCredentialResponse {
  credential?: string;
}

interface GoogleAccountsId {
  initialize: (config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    ux_mode?: "popup" | "redirect";
    use_fedcm_for_prompt?: boolean;
  }) => void;
  renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleAccountsId } };
  }
}

function loadGsi(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${GSI_SRC}"]`);
    const script = existing ?? document.createElement("script");
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("No se pudo cargar Google")), { once: true });
    if (!existing) {
      script.src = GSI_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });
}

interface Props {
  /** Se llama con el token propio de Vibratto y el usuario al iniciar sesión. */
  onSuccess: (token: string, user: unknown) => void;
  onError?: (message: string) => void;
  /** Tipo de cuenta si el usuario se crea por primera vez. */
  tipo?: "musico" | "productor" | "venue";
}

export default function GoogleSignInButton({ onSuccess, onError, tipo }: Props) {
  const holder = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Los callbacks cambian en cada render; se guardan en refs para no reinicializar el botón.
  const handlers = useRef({ onSuccess, onError, tipo });
  handlers.current = { onSuccess, onError, tipo };

  useEffect(() => {
    let cancelled = false;

    loadGsi()
      .then(() => {
        if (cancelled || !holder.current || !window.google) return;

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          ux_mode: "popup",
          callback: async ({ credential }) => {
            if (!credential) return handlers.current.onError?.("Google no entregó una credencial.");
            try {
              const { data } = await api.post(
                "/auth/google",
                { credential, tipo: handlers.current.tipo },
                { withCredentials: true },
              );
              if (!data?.token || !data?.usuario) {
                return handlers.current.onError?.("La respuesta del servidor es inválida.");
              }
              handlers.current.onSuccess(data.token, data.usuario);
            } catch (error) {
              const axiosError = error as AxiosError<{ mensaje?: string }>;
              handlers.current.onError?.(
                axiosError.response?.data?.mensaje || "No pudimos iniciar sesión con Google.",
              );
            }
          },
        });

        window.google.accounts.id.renderButton(holder.current, {
          type: "standard",
          theme: "filled_black",
          size: "large",
          shape: "pill",
          text: "continue_with",
          logo_alignment: "left",
          locale: "es",
          width: Math.min(400, Math.max(200, holder.current.clientWidth || 320)),
        });
        setReady(true);
      })
      .catch(() => handlers.current.onError?.("No pudimos cargar el acceso con Google."));

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex min-h-[44px] w-full justify-center">
      <div ref={holder} className="w-full max-w-[400px]" aria-busy={!ready} />
    </div>
  );
}
