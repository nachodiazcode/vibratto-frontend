"use client";

import Link from "next/link";
import {
  Box,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Star from "@mui/icons-material/Star";

export default function HomePage() {
  return (
    <Box
      className="min-h-screen text-white relative overflow-hidden"
      sx={{
        background: "radial-gradient(ellipse at bottom, #0e1a2b, #1a2c44, #263d58)",
      }}
    >
      {/* 🌸 Blobs Pastel */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 280,
          height: 280,
          background: "radial-gradient(circle, rgba(255,192,203,0.35), transparent)",
          borderRadius: "50%",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "5%",
          right: "10%",
          width: 240,
          height: 240,
          background: "radial-gradient(circle, rgba(173,216,230,0.3), transparent)",
          borderRadius: "50%",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 320,
          height: 320,
          background: "radial-gradient(circle, rgba(221,160,221,0.25), transparent)",
          borderRadius: "50%",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Hero principal */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={10}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Texto principal */}
          <Box flex={1}>
            <Typography
              variant="h2"
              sx={{
                textAlign: { xs: "center", md: "left" },
                fontSize: { xs: "2.5rem", md: "4rem" },
                fontWeight: 800,
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.2,
                background: "linear-gradient(to right, #e0f2ff, #c7d2fe)",
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
                color: "#e0e7ff",
                fontSize: "1.125rem",
                maxWidth: "40rem",
                lineHeight: 1.7,
                mt: 4,
              }}
            >
              Conecta con artistas adorables, descubre talentos brillantes y crea música en comunidad con vibras pastel y mucha ternura.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent={{ xs: "center", md: "flex-start" }}
              sx={{ mt: 5 }}
            >
              <Link href="/login" passHref>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "#a78bfa",
                    borderRadius: "999px",
                    px: 5,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: "1rem",
                    textTransform: "none",
                    animation: "pulse 2.5s infinite",
                    boxShadow: "0 0 24px rgba(167,139,250,0.4)",
                    "&:hover": {
                      bgcolor: "#8b5cf6",
                      boxShadow: "0 0 32px rgba(167,139,250,0.6)",
                    },
                  }}
                >
                  Empezar ahora
                </Button>
              </Link>

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
                Explorar artistas
              </Button>
            </Stack>

            <Box className="flex items-center gap-1 text-sm text-slate-300 pt-10">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star key={i} fontSize="small" sx={{ color: "#facc15" }} />
                ))}
              <span className="ml-2">
                10.000+ músicos ya confían en Vibratto
              </span>
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
              alt="Ilustración kawaii"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "1rem",
              }}
            />
          </Box>
        </Stack>

        {/* Cards Funcionalidades */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "2.5rem" },
            my: 10,
          }}
        >
          ¿Qué puedes hacer en Vibratto?
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
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#fff",
                transition: "all 0.35s ease",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                "&:hover": {
                  transform: "translateY(-6px) scale(1.02)",
                  boxShadow: "0 0 24px 4px rgba(255,255,255,0.1)",
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
                <Typography sx={{ color: "#e2e8f0" }}>{card.desc}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>

      {/* Llamado final */}
      <Box className="text-center pt-20 pb-32 bg-[#1e1b3a] border-t border-white/10 px-6 mt-10">
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
        <Typography sx={{ color: "#cbd5e1", mb: 8 }}>
          Únete gratis, explora artistas y haz match musical con quien sueñas colaborar.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: "#a78bfa",
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

      {/* Animaciones */}
      <style jsx global>{`
        @keyframes floatY {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.7);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(167, 139, 250, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(167, 139, 250, 0);
          }
        }
      `}</style>
    </Box>
  );
}
