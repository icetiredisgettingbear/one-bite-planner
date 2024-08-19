"use client";

import { AppBar as MuiAppBar, AppBarProps } from "@mui/material";

export default function AppBar({ ...props }: AppBarProps) {
  return <MuiAppBar {...props} />;
}
