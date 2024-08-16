import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Button from "./Button";

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
      안녕하세요, {user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          로그아웃
        </button>
      </form>
    </div>
  ) : (
    <Button href="/login" variant="outlined">
      로그인
    </Button>
  );
}
