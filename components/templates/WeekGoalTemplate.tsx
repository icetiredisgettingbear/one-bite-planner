"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Typography from "@/components/Typography";
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
import { WeeklyGoal, upsertWeeklyGoal } from "@/utils/api/goals/updateGoals";

type CurrentGoalInfo = {
  monthlyGoal: string | null;
};
type WeeklyGoalLabel = `weeklyGoal${1 | 2 | 3 | 4 | 5 | 6}`;
type WeeklyGoals = Record<WeeklyGoalLabel, WeeklyGoal>;

const { year, weeks, currentWeek, month } = getCurrentDateInfo();

const goals: WeeklyGoalLabel[] = weeks.map(
  (week, index) => `weeklyGoal${index + 1}` as WeeklyGoalLabel
);

const initialGoal: WeeklyGoals = weeks.reduce((acc, week, index) => {
  acc[`weeklyGoal${index + 1}` as WeeklyGoalLabel] = {
    year,
    week,
    goal: "",
    is_achieved: false,
  };
  return acc;
}, {} as WeeklyGoals);

export default function WeekGoalTemplate() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoals>(initialGoal);
  const [currentGoalInfo, setCurrentGoalInfo] = useState<CurrentGoalInfo>({
    monthlyGoal: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWeeklyGoals((prev) => ({
      ...prev,
      [name]: { ...prev[name as WeeklyGoalLabel], goal: value },
    }));
  };

  const handleSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    const goalsToInsert = goals
      .filter((goal) => weeklyGoals[goal].goal !== null)
      .map((goal) => weeklyGoals[goal]);
    await upsertWeeklyGoal(goalsToInsert);

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

      if (fetchedWeeklyGoals && fetchedWeeklyGoals?.length > 0) {
        const convertToObject = (arr: WeeklyGoal[]): WeeklyGoals => {
          return arr.reduce((acc, goal, index) => {
            acc[`weeklyGoal${index + 1}` as WeeklyGoalLabel] = goal;
            return acc;
          }, {} as WeeklyGoals);
        };

        setWeeklyGoals(convertToObject(fetchedWeeklyGoals));
      }
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
              placeholder="목표를 알려주세요"
              size={isSmallScreen ? "medium" : "large"}
              fullWidth
              value={
                weeklyGoals[`weeklyGoal${index + 1}` as WeeklyGoalLabel].goal
              }
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
