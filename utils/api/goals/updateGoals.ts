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
