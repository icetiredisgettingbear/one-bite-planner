"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Typography from "@/components/Typography";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, FormEventHandler, useEffect } from "react";
import TemplateLayout from "../layouts/TemplateLayout";
import Stack from "@/components/Stack";
import { getCurrentDateInfo } from "@/utils/dateUtils";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  getCurrentMonthlyGoals,
  getCurrentWeeklyGoals,
} from "@/utils/api/goals/getGoals";

type CurrentGoalInfo = {
  monthlyGoal: string | null;
};

type FormData = { [key: string]: string };

export default function WeekGoalTemplate() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const supabase = createClient();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    weeklyGoal1: "",
    weeklyGoal2: "",
    weeklyGoal3: "",
    weeklyGoal4: "",
    weeklyGoal5: "",
    weeklyGoal6: "",
  });
  const [currentGoalInfo, setCurrentGoalInfo] = useState<CurrentGoalInfo>({
    monthlyGoal: "",
  });
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

  useEffect(() => {
    const fetchGoal = async () => {
      const fetchedMonthlyGoals = await getCurrentMonthlyGoals();
      const fetchedWeeklyGoals = await getCurrentWeeklyGoals();

      fetchedMonthlyGoals?.forEach((el) => {
        if (el.month === month) {
          setCurrentGoalInfo({ monthlyGoal: el.goal });
        }
      });

      const weeklyGoals = fetchedWeeklyGoals?.reduce((acc, curr, index) => {
        acc[`weeklyGoal${index + 1}`] = curr.goal;
        return acc;
      }, {} as Record<string, string>) as FormData;

      setFormData(weeklyGoals);
    };

    fetchGoal();
  }, []);

  return (
    <TemplateLayout>
      <Typography
        display="flex"
        alignItems="center"
        variant="body2"
        fontWeight={600}
        px={2}
        bgcolor="#E3ECF8"
        borderRadius={10}
        width="fit-content"
        color="text.brand"
        height={32}
      >
        {currentGoalInfo.monthlyGoal}
      </Typography>
      <Typography variant={isSmallScreen ? "h4" : "h2"}>
        {month}월, 매주 무엇을 해야 할까요?
      </Typography>
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
              size={isSmallScreen ? "medium" : "large"}
              fullWidth
              value={formData[`weeklyGoal${index + 1}`]}
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
            fullWidth={isSmallScreen}
          >
            이전
          </Button>
          <Button
            variant="contained"
            size="medium"
            type="submit"
            fullWidth={isSmallScreen}
          >
            다음
          </Button>
        </Stack>
      </Stack>
    </TemplateLayout>
  );
}
