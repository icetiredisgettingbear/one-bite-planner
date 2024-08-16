import YearGoalTemplate from "@/components/templates/YearGoalTemplate";
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

  return <YearGoalTemplate />;
}
