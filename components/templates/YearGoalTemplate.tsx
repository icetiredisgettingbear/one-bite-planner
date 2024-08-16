"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Typography from "@/components/Typography";
import { ChangeEvent, FormEvent, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function YearGoalTemplate() {
  const supabase = createClient();
  const router = useRouter();
  const [formData, setFormData] = useState({ yearlyGoal: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase
      .from("yearly_goals")
      .insert({ is_achieved: false, year: "2024", goal: formData.yearlyGoal });

    router.push("/goals-setup/quarter");
  };

  return (
    <div className="flex-1 w-[1280px] flex flex-col gap-8 items-center justify-center">
      <Typography variant="h3">
        2024년, 올해 이루고싶은 목표는 무엇인가요?
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="yearlyGoal"
          placeholder="올해 목표를 알려주세요"
          fullWidth
          onChange={handleChange}
        />
        <Button variant="outlined" size="large" type="submit">
          다음
        </Button>
      </form>
    </div>
  );
}
