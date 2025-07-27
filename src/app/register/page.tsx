"use client";

import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Stack,
    Paper,
    Snackbar,
    Alert,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showToast, setShowToast] = useState(false);

    const handleRegister = () => {
        if (!nombre || !email || !password) {
            console.error("❌ Todos los campos son obligatorios.");
            return;
        }

        const fakeUser = {
            _id: crypto.randomUUID(),
            username: nombre,
            email,
            rol: "usuario",
            fotoPerfil: "/personajes/dari.png", // puedes personalizarlo luego
        };

        localStorage.setItem("user", JSON.stringify(fakeUser));
        localStorage.setItem("authToken", crypto.randomUUID());

        console.log("✅ Registro exitoso:", fakeUser);

        setShowToast(true);

        setTimeout(() => {
            router.push("/login");
        }, 2000);
    };

    return (
        <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F0C24] to-[#15162B] text-white px-4">
            <Container maxWidth="sm">
                <Paper
                    elevation={4}
                    sx={{
                        borderRadius: "1.5rem",
                        px: 6,
                        py: 8,
                        backgroundColor: "#1a1c35",
                        border: "1px solid #3c3f66",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: "center",
                            fontWeight: 700,
                            mb: 2,
                            background: "linear-gradient(to right, #fff, #c7d2fe)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        ¡Crea tu cuenta en Vibratto!
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ textAlign: "center", color: "#cbd5e1", mb: 5 }}
                    >
                        Únete a la comunidad musical que hace vibrar al mundo.
                    </Typography>

                    <Stack spacing={3}>
                        <TextField
                            label="Nombre completo"
                            variant="filled"
                            fullWidth
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            InputProps={{
                                style: { backgroundColor: "#0f172a", color: "#fff" },
                            }}
                            InputLabelProps={{
                                style: { color: "#94a3b8" },
                            }}
                        />
                        <TextField
                            label="Correo electrónico"
                            variant="filled"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                style: { backgroundColor: "#0f172a", color: "#fff" },
                            }}
                            InputLabelProps={{
                                style: { color: "#94a3b8" },
                            }}
                        />
                        <TextField
                            label="Contraseña"
                            type="password"
                            variant="filled"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                style: { backgroundColor: "#0f172a", color: "#fff" },
                            }}
                            InputLabelProps={{
                                style: { color: "#94a3b8" },
                            }}
                        />
                        <Button
                            onClick={handleRegister}
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: "#6366f1",
                                borderRadius: "999px",
                                py: 1.5,
                                fontWeight: 600,
                                fontSize: "1rem",
                                textTransform: "none",
                                animation: "pulse 2.5s infinite",
                                "&:hover": {
                                    bgcolor: "#4f46e5",
                                    boxShadow: "0 0 32px rgba(99,102,241,0.6)",
                                },
                            }}
                        >
                            🎤 Crear cuenta
                        </Button>
                    </Stack>
                </Paper>
            </Container>

            <Snackbar
                open={showToast}
                autoHideDuration={6000}
                onClose={() => setShowToast(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setShowToast(false)}
                    severity="success"
                    sx={{ width: "100%", fontWeight: 600 }}
                >
                    Cuenta creada con éxito, {nombre}
                </Alert>
            </Snackbar>

            <style jsx global>{`
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
