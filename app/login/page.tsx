import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import TextField from "@/components/TextField";
import TemplateLayout from "@/components/layouts/TemplateLayout";
import Stack from "@/components/Stack";
import Typography from "@/components/Typography";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/goals-setup");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <TemplateLayout maxWidth="xs">
      <Typography variant="h2" textAlign="center" pt={4}>
        로그인
      </Typography>
      <Stack component="form" direction="column" gap={4}>
        <Stack direction="column" gap={2}>
          <TextField
            label="이메일"
            name="email"
            placeholder="you@example.com"
            size="medium"
            variant="outlined"
            required
          />
          <TextField
            label="비밀번호"
            type="password"
            name="password"
            placeholder="••••••••"
            size="medium"
            variant="outlined"
            required
          />
        </Stack>
        <Stack direction="column" gap={2}>
          <SubmitButton formAction={signIn} pendingText="로그인 중...">
            로그인
          </SubmitButton>
          <SubmitButton
            formAction={signUp}
            pendingText="회원가입 중..."
            color="info"
          >
            회원가입
          </SubmitButton>
        </Stack>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </Stack>
    </TemplateLayout>
  );
}
