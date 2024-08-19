import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Button from "./Button";
import Typography from "./Typography";
import Stack from "./Stack";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <Stack direction="row" alignItems="center" gap={2}>
      <Typography variant="body2">안녕하세요, {user.email}!</Typography>
      <form action={signOut}>
        <Button variant="contained" color="info" size="small" type="submit">
          로그아웃
        </Button>
      </form>
    </Stack>
  ) : (
    <Button href="/login" size="small">
      로그인
    </Button>
  );
}
