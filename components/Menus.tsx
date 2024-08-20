"use client";

import Link from "next/link";
import Typography from "./Typography";
import { usePathname } from "next/navigation";
import List from "./List";
import ListItem from "./ListItem";

export type Menu = {
  pathname: string;
  label: string;
};

export interface MenusProps {
  menus: Menu[];
}

export default function Menus({ menus }: MenusProps) {
  const currPathname = usePathname();

  return (
    <List sx={{ display: "flex", gap: 4, padding: 0 }}>
      {menus.map(({ pathname, label }) => (
        <ListItem key={pathname} sx={{ padding: 0 }}>
          <Link href={pathname} passHref style={{ textDecoration: "none" }}>
            <Typography
              variant="body1"
              color={currPathname.includes(pathname) ? "brand" : "primary"}
            >
              {label}
            </Typography>
          </Link>
        </ListItem>
      ))}
    </List>
  );
}
