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
import {
  QuarterlyGoal,
  upsertQuarterlyGoal,
} from "@/utils/api/goals/updateGoals";

type QuarterlyGoalLabel = `quarterlyGoal${1 | 2 | 3}`;
type QuarterlyGoals = Record<QuarterlyGoalLabel, QuarterlyGoal>;

const { year, quarter } = getCurrentDateInfo();

const goals: QuarterlyGoalLabel[] = [
  "quarterlyGoal1",
  "quarterlyGoal2",
  "quarterlyGoal3",
];

const initialGoal: QuarterlyGoal = {
  year,
  quarter,
  goal: "",
  is_achieved: false,
};

export default function QuarterGoalTemplate() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const supabase = createClient();
  const [yearlyGoal, setYearlyGoal] = useState<string | null>(null);
  const [quarterlyGoals, setQuarterlyGoals] = useState<QuarterlyGoals>({
    quarterlyGoal1: initialGoal,
    quarterlyGoal2: initialGoal,
    quarterlyGoal3: initialGoal,
  });

  const commonInsertData = { is_achieved: false, year, quarter };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuarterlyGoals((prev) => ({
      ...prev,
      [name]: { ...prev[name as QuarterlyGoalLabel], goal: value },
    }));
  };

  const handleSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    const goalsToInsert = goals.map((goal) => quarterlyGoals[goal]);
    await upsertQuarterlyGoal(goalsToInsert);

    router.push("/goals-setup/month");
  };

  useEffect(() => {
    const fetchGoal = async () => {
      const fetchedYearlyGoal = await getCurrentYearlyGoal();
      const fetchedQuarterlyGoals = (await getCurrentQuarterlyGoals()) || [];

      const convertToObject = (arr: QuarterlyGoal[]): QuarterlyGoals => {
        return arr.reduce((acc, goal, index) => {
          acc[`quarterlyGoal${index + 1}` as QuarterlyGoalLabel] = goal;
          return acc;
        }, {} as QuarterlyGoals);
      };

      setYearlyGoal(fetchedYearlyGoal?.goal);
      setQuarterlyGoals(convertToObject(fetchedQuarterlyGoals));
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
            value={quarterlyGoals[goal].goal}
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
