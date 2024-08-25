"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Typography from "./Typography";
import Stack from "./Stack";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getUserProfile } from "@/utils/api/auth/getUserInfo";

type UserProfile = {
  id: string;
  username: string;
  goals_set: boolean;
  created_at: string;
};

export default function AuthButton() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchedUser = async () => {
      const fetchedGoal = await getUserProfile();
      setUserProfile(fetchedGoal);
    };

    fetchedUser();
  }, []);

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return userProfile ? (
    <Stack direction="row" alignItems="center" gap={2}>
      <Stack
        direction={isSmallScreen ? "column" : "row"}
        gap={isSmallScreen ? 0 : 0.5}
      >
        <Typography variant="body2">안녕하세요, </Typography>
        <Typography variant="body2" fontWeight={600}>
          {userProfile.username}님
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
