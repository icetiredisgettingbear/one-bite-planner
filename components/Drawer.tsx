"use client";

import {
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
} from "@mui/material";

export interface DrawerProps extends MuiDrawerProps {}

export default function Drawer({ ...props }: DrawerProps) {
  return <MuiDrawer {...props} />;
}
