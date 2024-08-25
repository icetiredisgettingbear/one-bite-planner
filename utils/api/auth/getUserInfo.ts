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

export const getUserProfile = async () => {
  const supabase = createClient();

  const userId = await getUserId();

  if (!userId) {
    console.error("User is not logged in");
    return;
  }

  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId);

  if (error) {
    console.error("Error fetching user profile:", error.message);
    return null;
  }

  return data[0];
};
