import WeekGoalTemplate from "@/components/templates/WeekGoalTemplate";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function WeekGoalPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return <WeekGoalTemplate />;
}
