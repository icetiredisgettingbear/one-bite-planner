"use client";

import { List as MuiList, ListProps } from "@mui/material";

export default function List({ ...props }: ListProps) {
  return <MuiList {...props} />;
}
