"use client";

import { Container } from "@mui/material";
import { ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  sx?: object;
}

export default function MainContainer({
  children,
  maxWidth = "lg",
  sx = {},
}: MainContainerProps) {
  return (
    <Container
      maxWidth={maxWidth}
      disableGutters
      sx={{
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
        width: "100%",
        ...sx,
      }}
    >
      {children}
    </Container>
  );
}
