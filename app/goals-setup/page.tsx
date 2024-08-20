import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function GoalSetUpPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // TODO: 매일 일정 데이터 있으면, "/goals-setup/to-do"로 redirect
  // TODO: 매일 일정 데이터 없으면, "/goals-setup/year"로 redirect

  // /goals-setup/year"로 임시 redirect 처리
  redirect("/goals-setup/year");

  return <div />;
}
