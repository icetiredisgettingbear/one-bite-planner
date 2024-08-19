import AuthButton from "@/components/AuthButton";
import Link from "next/link";
import Image from "next/image";
import Menus, { Menu } from "./Menus";
import AppBar from "@mui/material/AppBar";
import Container from "./Container";
import Toolbar from "./Toolbar";
import Stack from "./Stack";

const menus: Menu[] = [
  { pathname: "/goals-setup", label: "계획하기" },
  { pathname: "/to-do", label: "실행하기" },
  { pathname: "/progress", label: "돌아보기" },
];

interface HeaderProps {
  isSupabaseConnected: boolean;
}

export default function Header({ isSupabaseConnected }: HeaderProps) {
  return (
    <AppBar position="fixed" color="inherit" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Stack direction="row" flexGrow={1} gap={6}>
            <Link
              href="/"
              passHref
              style={{ display: "flex", alignItems: "center" }}
            >
              <Image
                src="/images/one_bite_planner_logo.svg"
                alt="한입 플래너 로고"
                width={100}
                height={22}
              />
            </Link>
            <Menus menus={menus} />
          </Stack>
          {isSupabaseConnected && <AuthButton />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
