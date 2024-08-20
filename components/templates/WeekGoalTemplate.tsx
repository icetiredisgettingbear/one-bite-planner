"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Typography from "@/components/Typography";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, FormEventHandler } from "react";
import TemplateLayout from "../layouts/TemplateLayout";
import Stack from "@/components/Stack";
import { getCurrentDateInfo } from "@/utils/dateUtils";

type FormData = { [key: string]: string };

export default function WeekGoalTemplate() {
  const supabase = createClient();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({});
  const { year, month, currentWeek, weeks } = getCurrentDateInfo();

  const commonInsertData = { is_achieved: false, year };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    const goalsToInsert = weeks.map((week, index) => ({
      ...commonInsertData,
      week,
      goal: formData[`weeklyGoal${index + 1}`],
    }));

    const { error } = await supabase.from("weekly_goals").insert(goalsToInsert);

    if (error) {
      console.error("Error inserting weekly goals:", error.message);
      return;
    }

    router.push("/to-do");
  };

  return (
    <TemplateLayout>
      <Typography variant="h2">{month}월, 매주 무엇을 해야 할까요?</Typography>
      <Stack component="form" gap={2} onSubmit={handleSubmit}>
        {weeks.map((week, index) => {
          const weekNumber = index + 1;

          const getLabel = () => {
            if (week < currentWeek) return "지나간 주입니다";
            if (week === currentWeek)
              return `${weekNumber}째 주 목표 (이번 달)`;

            return `${weekNumber}째 주 목표`;
          };

          return (
            <TextField
              key={`weeklyGoal${index + 1}`}
              name={`weeklyGoal${index + 1}`}
              label={getLabel()}
              placeholder="이번 분기 목표를 알려주세요"
              size="large"
              fullWidth
              disabled={week < currentWeek}
              onChange={handleChange}
            />
          );
        })}
        <Stack direction="row" gap={1.5} mt={6}>
          <Button
            variant="contained"
            size="medium"
            color="info"
            href="/goals-setup/month"
          >
            이전
          </Button>
          <Button variant="contained" size="medium" type="submit">
            다음
          </Button>
        </Stack>
      </Stack>
    </TemplateLayout>
  );
}
