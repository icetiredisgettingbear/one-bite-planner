"use client";

import Link from "next/link";
import Typography from "./Typography";
import { usePathname } from "next/navigation";
import List from "./List";
import ListItem from "./ListItem";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Box from "./Box";
import Drawer from "./Drawer";
import Stack from "./Stack";
import AuthButton from "./AuthButton";

export type Menu = {
  pathname: string;
  label: string;
};

export interface MenusProps {
  menus: Menu[];
}

export default function Menus({ menus }: MenusProps) {
  const currPathname = usePathname();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  const drawerList = (
    <Box
      sx={{ width: "100vw", px: 2, py: 1.5 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={6}
      >
        <AuthButton />
        <CloseIcon
          sx={{ fontSize: 32, color: "text.primary" }}
          onClick={toggleDrawer(false)}
        />
      </Stack>
      <List
        sx={{ display: "flex", flexDirection: "column", gap: 8, padding: 4 }}
      >
        {menus.map(({ pathname, label }) => (
          <ListItem key={pathname} sx={{ padding: 0 }}>
            <Link href={pathname} passHref style={{ textDecoration: "none" }}>
              <Typography
                variant="h4"
                color={currPathname.includes(pathname) ? "brand" : "primary"}
              >
                {label}
              </Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return isSmallScreen ? (
    <Stack
      direction="row"
      alignItems="center"
      flexGrow={1}
      pl={6}
      justifyContent="end"
    >
      <MenuIcon
        sx={{ fontSize: 32, color: "text.primary" }}
        onClick={toggleDrawer(true)}
      />
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "background.default",
          },
        }}
      >
        {drawerList}
      </Drawer>
    </Stack>
  ) : (
    <Stack
      direction="row"
      alignItems="center"
      flexGrow={1}
      pl={6}
      justifyContent="space-between"
    >
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
      <AuthButton />
    </Stack>
  );
}
