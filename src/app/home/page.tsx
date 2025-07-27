"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Box,
  Typography,
  useMediaQuery,
  Container,
  Drawer,
  Stack,
  Card,
} from "@mui/material";
import {
  Music2,
  Users,
  CalendarDays,
  Store,
  Sparkles,
  Newspaper,
  BarChart3,
  Bell,
  MessageSquareText,
  Cast,
  BadgePercent,
  ShoppingCart,
  Heart,
  LogOut,
  UserCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [recs, setRecs] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [collabs, setCollabs] = useState<any[]>([]);
  const [showToast, setShowToast] = useState(true);
  const isMobile = useMediaQuery("(max-width:790px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const userStorage = localStorage.getItem("user");

      if (!token || !userStorage) return;

      const parsedUser = JSON.parse(userStorage);
      setUser(parsedUser);

      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const baseURL = "http://localhost:3950/api";

      try {
        const [metricsRes, eventsRes, recsRes, collabRes, blogRes] = await Promise.all([
          axios.get(`${baseURL}/metrics/me`, headers),
          axios.get(`${baseURL}/events`, headers),
          axios.get(`${baseURL}/recommendation`, headers),
          axios.get(`${baseURL}/collab`, headers),
          axios.get(`${baseURL}/blog/posts`),
        ]);

        setMetrics(metricsRes.data);
        setEvents(eventsRes.data);
        setRecs(recsRes.data);
        setCollabs(collabRes.data);
        setPosts(blogRes.data);
      } catch (err) {
        console.error("❌ Error al cargar el dashboard:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const Sidebar = () => (
    <Box
      sx={{
        width: isMobile ? 0 : 180,
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(10px)",
        borderRight: "1px solid rgba(255,255,255,0.1)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        color: "white",
        position: isMobile ? "fixed" : "relative",
        zIndex: 1000,
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        🎵 Vibratto
      </Typography>
      {[
        { label: "Artistas", icon: <Music2 size={18} />, href: "/artistas" },
        { label: "Colaboraciones", icon: <Users size={18} />, href: "/colaboraciones" },
        { label: "Eventos", icon: <CalendarDays size={18} />, href: "/eventos" },
        { label: "Tienda", icon: <Store size={18} />, href: "/tienda" },
        { label: "Recomendaciones", icon: <Sparkles size={18} />, href: "/recomendaciones" },
        { label: "Blog", icon: <Newspaper size={18} />, href: "/blog" },
        { label: "Estadísticas", icon: <BarChart3 size={18} />, href: "/stats" },
        { label: "Notificaciones", icon: <Bell size={18} />, href: "/notificaciones" },
        { label: "Chat", icon: <MessageSquareText size={18} />, href: "/chat" },
        { label: "Streaming", icon: <Cast size={18} />, href: "/stream" },
        { label: "Premium", icon: <BadgePercent size={18} />, href: "/premium" },
        { label: "Carrito", icon: <ShoppingCart size={18} />, href: "/carrito" },
        { label: "Favoritos", icon: <Heart size={18} />, href: "/favoritos" },
        { label: "Perfil", icon: <UserCircle size={18} />, href: "/perfil" },
      ].map((item) => (
        <Link key={item.label} href={item.href}>
          <Box display="flex" alignItems="center" gap={1} sx={{ cursor: "pointer", py: 0.5 }}>
            {item.icon}
            <Typography variant="body2">{item.label}</Typography>
          </Box>
        </Link>
      ))}
      <Box mt="auto">
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ cursor: "pointer", color: "red", mt: 2 }}
        >
          <LogOut size={18} />
          <Typography variant="body2">Cerrar sesión</Typography>
        </Box>
      </Box>
    </Box>
  );

  const CardBox = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <Card
      sx={{
        p: 2,
        flex: 1,
        minWidth: 200,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 3,
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        color: "white",
      }}
    >
      <Typography fontWeight="bold" mb={0.5}>
        {title}
      </Typography>
      <Typography variant="body2" color="white" opacity={0.8}>
        {subtitle}
      </Typography>
    </Card>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #5d92cc, #6ea7e0, #78b2e4)",
        display: "flex",
        flexDirection: "row",
        overflowX: "hidden",
      }}
    >
      {!isMobile && <Sidebar />}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Sidebar />
      </Drawer>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              style={{
                position: "fixed",
                top: 20,
                right: 20,
                background: "rgba(255,255,255,0.1)",
                padding: "12px 24px",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
                color: "white",
                zIndex: 9999,
                fontWeight: "bold",
              }}
            >
              ¡Bienvenido {user?.nombre || "músico"}! 🌟
            </motion.div>
          )}
        </AnimatePresence>

        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" color="white">
            ¡Hola {user?.nombre || "músico"}! 🎧
          </Typography>
          <Typography variant="body1" color="white" mt={1}>
            Bienvenido a <strong>Vibratto</strong>, tu espacio musical para explorar, colaborar y brillar.
          </Typography>
        </Box>

        <Stack spacing={3} direction="row" flexWrap="wrap" justifyContent="center" gap={2}>
          <CardBox title="✨ Recomendaciones" subtitle={`${recs?.length || 0} artistas y eventos sugeridos`} />
          <CardBox title="💙 Likes esta semana" subtitle={`${metrics?.likes || 0} nuevos likes en tus proyectos`} />
          <CardBox title="🤝 Colaboraciones activas" subtitle={`Participas en ${collabs?.length || 0} colaboraciones`} />
          <CardBox title="📰 Último post" subtitle={posts[0]?.titulo || "Sin publicaciones aún"} />
          <CardBox title="🎵 Tu cuenta" subtitle={user?.premium ? "Premium activado ✅" : "Cuenta gratuita 🎶"} />
          <CardBox title="📅 Eventos esta semana" subtitle={`Tienes ${events?.length || 0} shows programados`} />
          {collabs.length === 0 && (
            <CardBox title="🤔 ¿Sin colaboraciones?" subtitle="¡Busca una en la sección de Colaboraciones!" />
          )}
        </Stack>

        <Box
          mt={6}
          p={3}
          borderRadius={4}
          sx={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography fontWeight="bold">🎧 Escuchando ahora:</Typography>
            <Typography variant="body2" mt={0.5}>
              “Dreaming in Pastel” — Miku Synthwave
            </Typography>
          </Box>
          <Box>
            <img
              src="/album-cover-placeholder.png"
              alt="Album"
              width={60}
              height={60}
              style={{ borderRadius: 12 }}
              onError={(e) =>
                (e.currentTarget.src = "https://via.placeholder.com/60x60.png?text=🎵")
              }
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
