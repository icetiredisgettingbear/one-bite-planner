"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Typography from "./Typography";
import Stack from "./Stack";
import { User } from "@supabase/supabase-js";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, []);

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return user ? (
    <Stack direction="row" alignItems="center" gap={2}>
      <Stack
        direction={isSmallScreen ? "column" : "row"}
        gap={isSmallScreen ? 0 : 0.5}
      >
        <Typography variant="body2">안녕하세요, </Typography>
        <Typography variant="body2" fontWeight={600}>
          {user.email}님
        </Typography>
      </Stack>
      <Button variant="contained" color="info" size="small" onClick={signOut}>
        로그아웃
      </Button>
    </Stack>
  ) : (
    <Button href="/login" size="small">
      로그인
    </Button>
  );
}
