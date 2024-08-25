import { createClient } from "@/utils/supabase/client";

export const getUserId = async (): Promise<string | null> => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error || !data?.session) {
    console.error("Error fetching user session:", error?.message);
    return null;
  }

  const userId = data.session.user.id;
  return userId;
};
