import { createClient } from "@/utils/supabase/client";
import { getCurrentDateInfo } from "@/utils/dateUtils";
import { getUserId } from "@/utils/api/auth/getUserInfo";

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
    .select("id, year, goal, is_achieved")
    .eq("user_id", userId)
    .eq("year", year)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching yearly goal:", error.message);
    return null;
  }

  return data;
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
    console.error("Error fetching quarterly goal:", error.message);
    return null;
  }

  return data?.map((item) => item.goal) || null;
};

export const getCurrentMonthlyGoals = async () => {
  const supabase = createClient();
  const { year, quarterMonths } = getCurrentDateInfo();

  const userId = await getUserId();

  if (!userId) {
    console.error("User is not logged in");
    return;
  }

  const { data, error } = await supabase
    .from("monthly_goals")
    .select("month, goal")
    .eq("user_id", userId)
    .eq("year", year)
    .in("month", quarterMonths)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching monthly goal:", error.message);
    return null;
  }

  return data;
};

export const getCurrentWeeklyGoals = async () => {
  const supabase = createClient();
  const { year, weeks } = getCurrentDateInfo();

  const userId = await getUserId();

  if (!userId) {
    console.error("User is not logged in");
    return;
  }

  const { data, error } = await supabase
    .from("weekly_goals")
    .select("week, goal")
    .eq("user_id", userId)
    .eq("year", year)
    .in("week", weeks)
    .order("id", { ascending: false })
    .limit(weeks.length);

  if (error) {
    console.error("Error fetching weekly goal:", error.message);
    return null;
  }

  return data.reverse();
};

export const getCurrentDailyGoals = async () => {
  const supabase = createClient();
  const { year, currentWeek } = getCurrentDateInfo();

  const userId = await getUserId();

  if (!userId) {
    console.error("User is not logged in");
    return;
  }

  const { data, error } = await supabase
    .from("daily_goals")
    .select("id, year, week, day_of_week, goal, is_achieved")
    .eq("user_id", userId)
    .eq("year", year)
    .eq("week", currentWeek);

  if (error) {
    console.error("Error fetching daily goal:", error.message);
    return null;
  }

  return data;
};
