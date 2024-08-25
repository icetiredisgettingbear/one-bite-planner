import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const deleteDailyGoals = async (deletedDailyGoalIds: number[]) => {
  if (deletedDailyGoalIds.length > 0) {
    const { error: deleteError } = await supabase
      .from("daily_goals")
      .delete()
      .in("id", deletedDailyGoalIds);

    if (deleteError) {
      console.error("Error deleting daily goals:", deleteError.message);
    }
  }
};
