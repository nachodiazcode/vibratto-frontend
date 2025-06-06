import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(to right, #0F0C24, #15162B)",
        borderBottom: "1px solid #2e2e3a",
        boxShadow: "0 0 20px rgba(99,102,241,0.1)",
        zIndex: 1100,
      }}
    >
      <Toolbar className="px-4 flex justify-between">
        {/* Logo + título */}
        <Box className="flex items-center gap-2">
          <MusicNoteIcon sx={{ color: "#6366f1" }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              color: "white",
            }}
          >
            Vibratto
          </Typography>
        </Box>

        {/* Links */}
        <Box className="hidden md:flex gap-6">
          <Button sx={{ color: "#cbd5e1", textTransform: "none" }}>Inicio</Button>
          <Button sx={{ color: "#cbd5e1", textTransform: "none" }}>Artistas</Button>
          <Button sx={{ color: "#cbd5e1", textTransform: "none" }}>Colaboraciones</Button>
          <Button sx={{ color: "#cbd5e1", textTransform: "none" }}>Eventos</Button>
        </Box>

        {/* Botón CTA */}
        <Button
          variant="contained"
          sx={{
            bgcolor: "#6366f1",
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            "&:hover": {
              bgcolor: "#4f46e5",
            },
          }}
        >
          🎧 Ingresar
        </Button>
      </Toolbar>
    </AppBar>
  );
}
