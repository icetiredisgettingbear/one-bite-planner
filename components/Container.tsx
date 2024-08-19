"use client";

import { Container as MuiContainer, ContainerProps } from "@mui/material";

export default function Container({ ...props }: ContainerProps) {
  return <MuiContainer {...props} />;
}
