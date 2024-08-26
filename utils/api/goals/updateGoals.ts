import { Todo } from "@/components/templates/TodoTemplate";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

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
