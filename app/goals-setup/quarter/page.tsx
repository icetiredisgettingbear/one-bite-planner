import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Typography from "@/components/Typography";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function YearGoalPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { error } = await supabase
    .from("year")
    .insert({ id: 1, name: "Denmark" });

  return (
    <div className="flex-1 w-[1280px] flex flex-col gap-8 justify-center">
      <div className="flex flex-col gap-4">
        <Typography variant="h3">이번 분기에 무엇을 해야할까요?</Typography>
        <Typography variant="h6" color="gray">
          최대 3개까지 입력할 수 있어요.
        </Typography>
      </div>
      <div className="flex flex-col gap-4">
        <TextField placeholder="이번 분기 목표를 알려주세요" fullWidth />
        <TextField placeholder="이번 분기 목표를 알려주세요" fullWidth />
        <TextField placeholder="이번 분기 목표를 알려주세요" fullWidth />
      </div>
      <div className="flex gap-4">
        <Button variant="outlined" size="large" href="/goals-setup/year">
          이전
        </Button>
        <Button variant="outlined" size="large">
          다음
        </Button>
      </div>
    </div>
  );
}
