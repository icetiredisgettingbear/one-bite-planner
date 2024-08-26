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
  getCurrentQuarterlyGoals,
  getCurrentYearlyGoal,
} from "@/utils/api/goals/getGoals";

type CurrentGoalInfo = {
  yearlyGoal: string | null;
  quarterlyGoals: string[];
};

type FormData = {
  monthlyGoal1: string;
  monthlyGoal2: string;
  monthlyGoal3: string;
};

const goals: (keyof FormData)[] = [
  "monthlyGoal1",
  "monthlyGoal2",
  "monthlyGoal3",
];

export default function MonthGoalTemplate() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const supabase = createClient();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    monthlyGoal1: "",
    monthlyGoal2: "",
    monthlyGoal3: "",
  });
  const [currentGoalInfo, setCurrentGoalInfo] = useState<CurrentGoalInfo>({
    yearlyGoal: null,
    quarterlyGoals: [],
  });
  const { year, month, quarterMonths } = getCurrentDateInfo();

  const commonInsertData = { is_achieved: false, year };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    const goalsToInsert = goals.map((goal, index) => ({
      ...commonInsertData,
      month: quarterMonths[index],
      goal: formData[goal],
    }));

    const { error } = await supabase
      .from("monthly_goals")
      .insert(goalsToInsert);

    if (error) {
      console.error("Error inserting monthly goals:", error.message);
      return;
    }

    router.push("/goals-setup/week");
  };

  useEffect(() => {
    const fetchGoal = async () => {
      const fetchedYearlyGoal = await getCurrentYearlyGoal();
      const fetchedQuarterlyGoals = await getCurrentQuarterlyGoals();
      const fetchedMonthlyGoals = await getCurrentMonthlyGoals();

      const monthlyGoals = fetchedMonthlyGoals?.reduce((acc, curr, index) => {
        acc[`monthlyGoal${index + 1}`] = curr.goal;
        return acc;
      }, {} as Record<string, string>) as FormData;

      setFormData(monthlyGoals);

      setCurrentGoalInfo({
        yearlyGoal: fetchedYearlyGoal?.goal || null,
        quarterlyGoals: fetchedQuarterlyGoals?.map((goal) => goal.goal) || [],
      });
    };

    fetchGoal();
  }, []);

  return (
    <TemplateLayout>
      <Stack direction="row" gap={1} flexWrap="wrap">
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
          {currentGoalInfo.yearlyGoal}
        </Typography>
        {currentGoalInfo.quarterlyGoals.map((goal, index) => (
          <Typography
            key={`quarterlyGoal${index}-${goal}`}
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
            {goal}
          </Typography>
        ))}
      </Stack>
      <Typography variant={isSmallScreen ? "h4" : "h2"}>
        매월 무엇을 해야 할까요?
      </Typography>
      <Stack component="form" gap={2} onSubmit={handleSubmit}>
        {quarterMonths.map((quarterMonth, index) => {
          const getLabel = () => {
            if (quarterMonth < month) return "지나간 달입니다";
            if (quarterMonth === month)
              return `${quarterMonth}월 목표 (이번 달)`;

            return `${quarterMonth}월 목표`;
          };

          return (
            <TextField
              key={`monthlyGoal${index + 1}`}
              name={`monthlyGoal${index + 1}`}
              label={getLabel()}
              placeholder="목표를 알려주세요"
              size={isSmallScreen ? "medium" : "large"}
              fullWidth
              disabled={quarterMonth < month}
              value={formData[`monthlyGoal${index + 1}` as keyof FormData]}
              onChange={handleChange}
            />
          );
        })}
        <Stack direction="row" gap={1.5} mt={6}>
          <Button
            variant="contained"
            size="medium"
            color="info"
            href="/goals-setup/quarter"
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
