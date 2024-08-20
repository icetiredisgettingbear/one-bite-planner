"use client";

import { Card as MuiCard, CardProps } from "@mui/material";

export default function Card({ ...props }: CardProps) {
  return <MuiCard {...props} />;
}
