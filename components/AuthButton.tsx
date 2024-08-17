import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Button from "./Button";
import Typography from "./Typography";

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
    <div className="flex items-center gap-4">
      <Typography variant="body2">안녕하세요, {user.email}!</Typography>
      <form action={signOut}>
        <Button variant="contained" color="info" size="small" type="submit">
          로그아웃
        </Button>
      </form>
    </div>
  ) : (
    <Button href="/login" size="small">
      로그인
    </Button>
  );
}
