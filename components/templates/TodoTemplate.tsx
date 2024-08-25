"use client";

import { ChangeEvent, useState, FormEventHandler, useEffect } from "react";
import {
  Card,
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
  Grid,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { createClient } from "@/utils/supabase/client";
import TemplateLayout from "../layouts/TemplateLayout";
import Checkbox from "../Checkbox";
import Box from "@/components/Box";
import { getCurrentDateInfo } from "@/utils/dateUtils";
import {
  getCurrentDailyGoals,
  getCurrentWeeklyGoals,
} from "@/utils/api/goals/getGoals";

type CurrentGoalInfo = {
  weeklyGoal: string | null;
};

interface Todo {
  id: number;
  year: number;
  week: number;
  dayOfWeek: string;
  goal: string;
  isAchieved: boolean;
}

const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

const TodoTemplate: React.FC = () => {
  const supabase = createClient();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { year, currentWeek } = getCurrentDateInfo();

  const initialTodos: Record<string, Todo[]> = daysOfWeek.reduce((acc, day) => {
    acc[day] = [];
    return acc;
  }, {} as Record<string, Todo[]>);

  const [todos, setTodos] = useState<Record<string, Todo[]>>(initialTodos);
  const [currentGoalInfo, setCurrentGoalInfo] = useState<CurrentGoalInfo>({
    weeklyGoal: "",
  });

  const addTodo = (dayOfWeek: string) => {
    const newTodo = {
      id: Date.now(),
      year,
      week: currentWeek,
      dayOfWeek,
      goal: "",
      isAchieved: false,
    };
    setTodos((prev) => ({
      ...prev,
      [dayOfWeek]: [...(prev[dayOfWeek] || []), newTodo],
    }));
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    dayOfWeek: string,
    id: number
  ) => {
    const isAchieved = event.target.checked;
    setTodos((prev) => ({
      ...prev,
      [dayOfWeek]: prev[dayOfWeek].map((todo) =>
        todo.id === id ? { ...todo, isAchieved } : todo
      ),
    }));
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    dayOfWeek: string,
    id: number
  ) => {
    const newGoal = event.target.value;
    setTodos((prev) => ({
      ...prev,
      [dayOfWeek]: prev[dayOfWeek].map((todo) =>
        todo.id === id ? { ...todo, goal: newGoal } : todo
      ),
    }));
  };

  const handleDeleteTodo = (dayOfWeek: string, id: number) => {
    setTodos((prev) => ({
      ...prev,
      [dayOfWeek]: prev[dayOfWeek].filter((todo) => todo.id !== id),
    }));
  };

  const handleAddTodo = (dayOfWeek: string) => {
    addTodo(dayOfWeek);
  };

  const handleSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    const goal = Object.values(todos)
      .flat()
      .map(({ id, dayOfWeek, isAchieved, ...rest }) => ({
        day_of_week: dayOfWeek,
        is_achieved: isAchieved,
        ...rest,
      }));

    const { error } = await supabase.from("daily_goals").insert(goal);

    if (error) {
      console.error("Error inserting daily goals:", error.message);
      return;
    }
  };

  useEffect(() => {
    const fetchGoal = async () => {
      const fetchedWeeklyGoals = await getCurrentWeeklyGoals();
      const fetchedDailyoals = (await getCurrentDailyGoals()) || [];

      fetchedWeeklyGoals?.forEach((el) => {
        if (el.week === currentWeek) {
          setCurrentGoalInfo({ weeklyGoal: el.goal });
        }
      });

      const dailyGoals = daysOfWeek.reduce<Record<string, any[]>>(
        (acc, day) => {
          acc[day] = fetchedDailyoals
            .filter((todo) => todo.day_of_week === day)
            .map(({ day_of_week, is_achieved, ...rest }) => ({
              dayOfWeek: day_of_week,
              isAchieved: is_achieved,
              ...rest,
            }));
          return acc;
        },
        {}
      ) as Record<string, Todo[]>;

      setTodos(dailyGoals);
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
        {currentGoalInfo.weeklyGoal}
      </Typography>
      <Typography variant={isSmallScreen ? "h4" : "h2"}>
        매일 해야 할 일을 한 입 거리로 나눠보세요.
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {daysOfWeek.map((day) => (
            <Grid item xs={12} sm={6} md={4} key={day}>
              <Card
                key={day}
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  px: 3,
                  py: 2.5,
                  bgcolor: "background.paper",
                  gap: 1.5,
                  height: "100%",
                }}
              >
                <Stack gap={1} flex={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      display="flex"
                      alignItems="center"
                      variant="caption"
                      fontWeight={600}
                      py={0.25}
                      px={1.5}
                      bgcolor="#E9E9E9"
                      borderRadius={10}
                      width="fit-content"
                      height={24}
                    >
                      {day}요일
                    </Typography>
                    <Button
                      variant="contained"
                      color="info"
                      size="xsmall"
                      sx={{ background: "#DDDDDD" }}
                      onClick={() => handleAddTodo(day)}
                    >
                      추가
                    </Button>
                  </Stack>
                  <Stack gap={0.5}>
                    {todos[day].length < 1 ? (
                      <Typography variant="body2" color="text.disabled">
                        목표를 추가해 주세요.
                      </Typography>
                    ) : (
                      todos[day].map(({ id, goal, isAchieved }) => (
                        <Stack
                          direction="row"
                          key={id}
                          alignItems="center"
                          spacing={1}
                        >
                          <Checkbox
                            name="isAchieved"
                            checked={isAchieved}
                            onChange={(e) => handleCheckboxChange(e, day, id)}
                            sx={{ p: 0 }}
                          />
                          <TextField
                            value={goal}
                            onChange={(e) => handleInputChange(e, day, id)}
                            placeholder="목표를 알려주세요"
                            size="small"
                            fullWidth
                            InputProps={{ disableUnderline: true }}
                            sx={{ input: { padding: 0 } }}
                          />
                          <IconButton
                            onClick={() => handleDeleteTodo(day, id)}
                            aria-label="delete"
                          >
                            <CloseIcon
                              sx={{ fontSize: 20, color: "text.disabled" }}
                            />
                          </IconButton>
                        </Stack>
                      ))
                    )}
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Stack direction="row" gap={1.5} mt={6}>
          <Button
            variant="contained"
            size="medium"
            color="info"
            href="/goals-setup/week"
            fullWidth={isSmallScreen}
          >
            이전
          </Button>
          <Button size="medium" type="submit" fullWidth={isSmallScreen}>
            저장
          </Button>
        </Stack>
      </Box>
    </TemplateLayout>
  );
};

export default TodoTemplate;
