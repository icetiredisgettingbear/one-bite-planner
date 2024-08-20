import TodoTemplate from "@/components/templates/TodoTemplate";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function TodoPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return <TodoTemplate />;
}
