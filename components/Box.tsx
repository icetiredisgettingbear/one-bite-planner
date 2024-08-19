"use client";

import { Box as MuiBox, BoxProps } from "@mui/material";

export default function Box({ ...props }: BoxProps) {
  return <MuiBox {...props} />;
}
