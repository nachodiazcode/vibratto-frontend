import { useState } from "react";

// Asegúrate de que coincida con lo que Topbar espera
export type Notification = {
  id: number;             // ← CAMBIADO de string a number
  message: string;
  read?: boolean;
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1, // también corregido (antes era "1")
      message: "Tienes una nueva colaboración pendiente",
      read: false,
    },
  ]);

  const fetchNotifications = async () => {
    // Si más adelante haces una petición, asegúrate de transformar `id` a number
  };

  const clearNotifications = () => setNotifications([]);

  return {
    notifications,
    fetchNotifications,
    clearNotifications,
  };
};
