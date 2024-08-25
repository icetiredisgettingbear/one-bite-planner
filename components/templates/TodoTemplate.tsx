"use client";

import { ChangeEvent, useState, FormEventHandler } from "react";
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

  return (
    <TemplateLayout>
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
                        할 일을 추가하세요.
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
                            placeholder="할 일을 입력하세요"
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
        <Button
          size="medium"
          type="submit"
          sx={{ mt: 6 }}
          fullWidth={isSmallScreen}
        >
          저장
        </Button>
      </Box>
    </TemplateLayout>
  );
};

export default TodoTemplate;
