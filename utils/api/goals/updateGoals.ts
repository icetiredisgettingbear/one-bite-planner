import { Todo } from "@/components/templates/TodoTemplate";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const upsertDailyGoals = async (goals: Record<string, Todo[]>) => {
  for (const day in goals) {
    for (const goal of goals[day]) {
      const { data: existingGoal, error } = await supabase
        .from("daily_goals")
        .select("*")
        .eq("id", goal.id)
        .single();

      if (error && error.code !== "PGRST116") {
        // "PGRST116" is "No rows found"
        console.error("Error fetching existing goal:", error.message);
        continue;
      }

      if (existingGoal) {
        const { error: updateError } = await supabase
          .from("daily_goals")
          .update({ goal: goal.goal, is_achieved: goal.isAchieved })
          .eq("id", existingGoal.id);

        if (updateError) {
          console.error("Error updating daily goals:", updateError.message);
        }
      } else {
        const { id, dayOfWeek, isAchieved, ...rest } = goal;
        const { error: insertError } = await supabase
          .from("daily_goals")
          .insert({
            day_of_week: dayOfWeek,
            is_achieved: goal.isAchieved,
            ...rest,
          });

        if (insertError) {
          console.error(
            "Error inserting new daily goals:",
            insertError.message
          );
        }
      }
    }
  }
};
