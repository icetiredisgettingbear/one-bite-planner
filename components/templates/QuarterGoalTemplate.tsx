"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Typography from "@/components/Typography";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, FormEventHandler, useEffect } from "react";
import TemplateLayout from "../layouts/TemplateLayout";
import Stack from "../Stack";
import { getCurrentDateInfo } from "@/utils/dateUtils";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  getCurrentYearlyGoal,
  getCurrentQuarterlyGoals,
} from "@/utils/api/goals/getGoals";

type FormData = {
  quarterlyGoal1: string;
  quarterlyGoal2: string;
  quarterlyGoal3: string;
};

const goals: (keyof FormData)[] = [
  "quarterlyGoal1",
  "quarterlyGoal2",
  "quarterlyGoal3",
];

const initialGoals = {
  quarterlyGoal1: "",
  quarterlyGoal2: "",
  quarterlyGoal3: "",
};

export default function QuarterGoalTemplate() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const supabase = createClient();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialGoals);
  const [yearlyGoal, setYearlyGoal] = useState<string | null>(null);
  const { year, quarter } = getCurrentDateInfo();

  const commonInsertData = { is_achieved: false, year, quarter };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    const goalsToInsert = goals.map((goal) => ({
      ...commonInsertData,
      goal: formData[goal],
    }));

    const { error } = await supabase
      .from("quarterly_goals")
      .insert(goalsToInsert);

    if (error) {
      console.error("Error inserting quarterly goals:", error.message);
      return;
    }

    router.push("/goals-setup/month");
  };

  useEffect(() => {
    const fetchGoal = async () => {
      const fetchedYearlyGoal = await getCurrentYearlyGoal();
      const fetchedQuarterlyGoals = (await getCurrentQuarterlyGoals()) || [];
      const convertToObject = (arr: string[]): Record<string, string> => {
        return arr.reduce((acc, goal, index) => {
          acc[`quarterlyGoal${index + 1}`] = goal;
          return acc;
        }, {} as Record<string, string>);
      };
      const quarterlyGoals = convertToObject(fetchedQuarterlyGoals) as FormData;

      setYearlyGoal(fetchedYearlyGoal?.goal);
      setFormData(quarterlyGoals);
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
        {yearlyGoal}
      </Typography>
      <Stack gap={2}>
        <Typography variant={isSmallScreen ? "h4" : "h2"}>
          이번 {quarter}분기에 무엇을 해야 할까요?
        </Typography>
        <Typography variant="subtitle2" color="secondary">
          최대 3개까지 입력할 수 있어요.
        </Typography>
      </Stack>
      <Stack component="form" gap={2} onSubmit={handleSubmit}>
        {goals.map((goal, index) => (
          <TextField
            key={goal}
            name={goal}
            label={`분기 목표 ${index + 1}`}
            placeholder="목표를 알려주세요"
            size={isSmallScreen ? "medium" : "large"}
            fullWidth
            value={formData[goal]}
            onChange={handleChange}
          />
        ))}
        <Stack direction="row" gap={1.5} mt={6}>
          <Button
            variant="contained"
            size="medium"
            color="info"
            href="/goals-setup/year"
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
