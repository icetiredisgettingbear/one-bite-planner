import QuarterGoalTemplate from "@/components/templates/QuarterGoalTemplate";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function QuarterGoalPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return <QuarterGoalTemplate />;
}
