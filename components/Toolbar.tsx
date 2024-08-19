"use client";

import { Toolbar as MuiToolbar, ToolbarProps } from "@mui/material";

export default function Toolbar({ ...props }: ToolbarProps) {
  return <MuiToolbar {...props} />;
}
