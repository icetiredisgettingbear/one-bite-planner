import { Todo } from "@/components/templates/TodoTemplate";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export type YearlyGoal = {
  year: number;
  goal: string;
  is_achieved: boolean;
  id?: number;
};

export const upsertYearlyGoal = async (goal: YearlyGoal) => {
  const { error } = await supabase
    .from("yearly_goals")
    .upsert(goal, { onConflict: "id" });

  if (error) {
    console.error("Error upserting yearly goal:", error.message);
    return;
  }
};

export type QuarterlyGoal = {
  year: number;
  quarter: number;
  goal: string;
  is_achieved: boolean;
  id?: number;
};

export const upsertQuarterlyGoal = async (goal: QuarterlyGoal[]) => {
  const { error } = await supabase
    .from("quarterly_goals")
    .upsert(goal, { onConflict: "id" });

  if (error) {
    console.error("Error upserting quarterly goals:", error.message);
    return;
  }
};

export type MonthlyGoal = {
  year: number;
  month: number;
  goal: string;
  is_achieved: boolean;
  id?: number;
};

export const upsertMonthlyGoal = async (goal: MonthlyGoal[]) => {
  const { error } = await supabase
    .from("monthly_goals")
    .upsert(goal, { onConflict: "id" });

  if (error) {
    console.error("Error upserting monthly goals:", error.message);
    return;
  }
};

export type WeeklyGoal = {
  year: number;
  week: number;
  goal: string;
  is_achieved: boolean;
  id?: number;
};

export const upsertWeeklyGoal = async (goal: WeeklyGoal[]) => {
  const { error } = await supabase
    .from("weekly_goals")
    .upsert(goal, { onConflict: "id" });

  if (error) {
    console.error("Error upserting weekly goals:", error.message);
    return;
  }
};

export const upsertDailyGoals = async (goals: Record<string, Todo[]>) => {
  const todosArray = Object.values(goals)
    .flat()
    .map(({ dayOfWeek, isAchieved, ...rest }) => ({
      day_of_week: dayOfWeek,
      is_achieved: isAchieved,
      ...rest,
    }));

  const { error } = await supabase
    .from("daily_goals")
    .upsert(todosArray, { onConflict: "id" });

  if (error) {
    console.error("Error upserting daily goals:", error.message);
    return;
  }
};
