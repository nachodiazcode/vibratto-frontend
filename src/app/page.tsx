"use client";

import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function HomePage() {
  return (
    <Box className="min-h-screen bg-gradient-to-br from-[#0F0C24] to-[#15162B] text-white relative overflow-hidden">
      {/* Glow de fondo */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: { xs: "5%", md: "10%" },
          width: 320,
          height: 320,
          background: "radial-gradient(circle, #6366f1aa, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      />

      {/* Hero */}
      <Container maxWidth="lg" className="pb-0 px-6 relative z-10">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={10}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Texto y botones */}
          <Box flex={1}>
            <Typography
              variant="h2"
              sx={{
                textAlign: { xs: "center", md: "left" },
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 800,
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.2,
                background: "linear-gradient(to right, #ffffff, #c7d2fe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              La red social donde <br /> vive la música
            </Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: { xs: "center", md: "left" },
                color: "#cbd5e1",
                fontSize: "1.125rem",
                maxWidth: "40rem",
                lineHeight: 1.7,
                mt: 4,
              }}
            >
              Conecta con artistas, descubre talentos, colabora en proyectos y haz que tu música suene. Vibratto es más que una app: es tu comunidad creativa.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent={{ xs: "center", md: "flex-start" }}
              sx={{ mt: 5 }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#6366f1",
                  borderRadius: "999px",
                  px: 5,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                  animation: "pulse 2.5s infinite",
                  boxShadow: "0 0 24px rgba(99,102,241,0.4)",
                  "&:hover": {
                    bgcolor: "#4f46e5",
                    boxShadow: "0 0 32px rgba(99,102,241,0.6)",
                  },
                }}
              >
                🚀 Empezar ahora
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: "999px",
                  px: 5,
                  py: 1.5,
                  fontWeight: 500,
                  color: "#fff",
                  borderColor: "#ffffff44",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#ffffffaa",
                    backgroundColor: "#ffffff11",
                  },
                }}
              >
                🌐 Explorar artistas
              </Button>
            </Stack>

            <Box className="flex items-center gap-1 text-sm text-slate-400 pt-10">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star key={i} fontSize="small" sx={{ color: "#facc15" }} />
                ))}
              <span className="ml-2">10.000+ músicos ya confían en Vibratto</span>
            </Box>
          </Box>

          {/* Imagen animada */}
          <Box
            flex={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              animation: "floatY 6s ease-in-out infinite",
            }}
          >
            <img
              src="/personajes/dari.png"
              alt="Música anime"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "1rem",
              }}
            />
          </Box>
        </Stack>
      </Container>

      {/* Funciones */}
      <Container maxWidth="lg" className="pb-28 px-2">
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "2.5rem" },
            mb: 8,
          }}
        >
          Qué puedes hacer en Vibratto
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={6}
          justifyContent="center"
          alignItems="stretch"
        >
          {[
            {
              icon: <MusicNoteIcon fontSize="large" sx={{ color: "#60a5fa" }} />,
              title: "Explora artistas",
              desc: "Busca músicos por género, ubicación o estilo. Mira sus demos, perfiles y colaboraciones.",
            },
            {
              icon: <Diversity3Icon fontSize="large" sx={{ color: "#34d399" }} />,
              title: "Colabora con músicos",
              desc: "Arma bandas, comparte demos y crea música en conjunto desde cualquier parte del mundo.",
            },
            {
              icon: <CalendarMonthIcon fontSize="large" sx={{ color: "#facc15" }} />,
              title: "Encuentra conciertos",
              desc: "Aplica a gigs, ferias, festivales o eventos privados y lleva tu música al escenario.",
            },
          ].map((card, index) => (
            <Card
              key={index}
              sx={{
                flex: 1,
                borderRadius: "1rem",
                backgroundColor: "#1a1c35",
                border: "1px solid #3c3f66",
                color: "#fff",
                transition: "all 0.35s ease",
                boxShadow: "0 0 0 rgba(0,0,0,0)",
                "&:hover": {
                  transform: "translateY(-6px) scale(1.02)",
                  boxShadow: "0 0 12px 2px rgba(99,102,241,0.25)",
                  border: "1px solid #6366f1",
                },
              }}
            >
              <CardContent sx={{ p: 5 }}>
                {card.icon}
                <Typography
                  variant="h6"
                  sx={{ mt: 3, mb: 1.5, fontWeight: 700 }}
                >
                  {card.title}
                </Typography>
                <Typography sx={{ color: "#cbd5e1" }}>{card.desc}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>

      {/* CTA Final */}
      <Box className="text-center pt-20 pb-32 bg-[#0f172a] border-t border-white/10 px-6">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "2.5rem" },
            mb: 4,
          }}
        >
          ¿Listo para llevar tu música al siguiente nivel?
        </Typography>
        <Typography sx={{ color: "#94a3b8", mb: 8 }}>
          Únete gratis, explora artistas y haz match musical con quien sueñas colaborar.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: "#6366f1",
            borderRadius: "999px",
            px: 7,
            py: 1.8,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          🎧 Crear mi perfil
        </Button>
      </Box>

      <style jsx global>{`
        @keyframes floatY {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(99, 102, 241, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
          }
        }
      `}</style>
    </Box>
  );
}