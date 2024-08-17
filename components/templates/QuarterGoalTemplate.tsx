"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Typography from "@/components/Typography";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { FormEvent, ChangeEvent, useState } from "react";

export default function QuarterGoalTemplate() {
  const supabase = createClient();
  const router = useRouter();
  const [formData, setFormData] = useState({
    quarterlyGoal1: "",
    quarterlyGoal2: "",
    quarterlyGoal3: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.from("quarterly_goals").insert([
      {
        is_achieved: false,
        year: 2024,
        quarter: 3,
        goal: formData.quarterlyGoal1,
      },
      {
        is_achieved: false,
        year: 2024,
        quarter: 3,
        goal: formData.quarterlyGoal2,
      },
      {
        is_achieved: false,
        year: 2024,
        quarter: 3,
        goal: formData.quarterlyGoal3,
      },
    ]);

    router.push("/goals-setup/month");
  };

  return (
    <div className="flex-1 w-full max-w-[1280px] px-10 flex flex-col gap-5 justify-center">
      <div className="flex flex-col gap-3">
        <Typography variant="h2">이번 분기에 무엇을 해야할까요?</Typography>
        <Typography variant="subtitle2" className="text-secondary">
          최대 3개까지 입력할 수 있어요.
        </Typography>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextField
          name="quarterlyGoal1"
          label="분기 목표 1"
          placeholder="이번 분기 목표를 알려주세요"
          size="large"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="quarterlyGoal2"
          label="분기 목표 2"
          placeholder="이번 분기 목표를 알려주세요"
          size="large"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="quarterlyGoal3"
          label="분기 목표 3"
          placeholder="이번 분기 목표를 알려주세요"
          size="large"
          fullWidth
          onChange={handleChange}
        />
        <div className="flex gap-3 mt-10">
          <Button
            variant="contained"
            size="medium"
            color="info"
            href="/goals-setup/year"
          >
            이전
          </Button>
          <Button variant="contained" size="medium" type="submit">
            다음
          </Button>
        </div>
      </form>
    </div>
  );
}
