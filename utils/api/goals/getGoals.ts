import { createClient } from "@/utils/supabase/client";
import { getCurrentDateInfo } from "@/utils/dateUtils";
import { getUserId } from "@/utils/api/auth/getUserId";

export const getCurrentYearlyGoal = async () => {
  const supabase = createClient();
  const { year } = getCurrentDateInfo();

  const userId = await getUserId();

  if (!userId) {
    console.error("User is not logged in");
    return;
  }

  const { data, error } = await supabase
    .from("yearly_goals")
    .select("goal")
    .eq("user_id", userId)
    .eq("year", year)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching yearly goal:", error.message);
    return null;
  }

  return data?.goal || null;
};

export const getCurrentQuarterlyGoals = async () => {
  const supabase = createClient();
  const { year, quarter } = getCurrentDateInfo();

  const userId = await getUserId();

  if (!userId) {
    console.error("User is not logged in");
    return;
  }

  const { data, error } = await supabase
    .from("quarterly_goals")
    .select("goal")
    .eq("user_id", userId)
    .eq("year", year)
    .eq("quarter", quarter)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching yearly goal:", error.message);
    return null;
  }

  return data?.map((item) => item.goal) || null;
};
