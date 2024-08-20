"use client";

import { ListItem as MuiListItem, ListItemProps } from "@mui/material";

export default function ListItem({ ...props }: ListItemProps) {
  return <MuiListItem {...props} />;
}
