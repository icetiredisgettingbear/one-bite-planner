"use client";

import React, { useState } from "react";
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

interface ToDo {
  id: number;
  day: string;
  content: string;
}

const daysOfTheWeek = [
  { label: "월요일", key: "monday" },
  { label: "화요일", key: "tuesday" },
  { label: "수요일", key: "wednesday" },
  { label: "목요일", key: "thursday" },
  { label: "금요일", key: "friday" },
  { label: "토요일", key: "saturday" },
  { label: "일요일", key: "sunday" },
];

const initialTodos: Record<string, ToDo[]> = {
  monday: [{ id: 1, day: "monday", content: "" }],
  tuesday: [{ id: 2, day: "tuesday", content: "" }],
  wednesday: [{ id: 3, day: "wednesday", content: "" }],
  thursday: [{ id: 4, day: "thursday", content: "" }],
  friday: [{ id: 5, day: "friday", content: "" }],
  saturday: [{ id: 6, day: "saturday", content: "" }],
  sunday: [{ id: 7, day: "sunday", content: "" }],
};

const WeekGoals: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [toDos, setToDos] = useState<Record<string, ToDo[]>>(initialTodos);

  const addToDo = (day: string) => {
    const newToDo = { id: Date.now(), day, content: "" };
    setToDos((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), newToDo],
    }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    day: string,
    id: number
  ) => {
    const newContent = event.target.value;
    setToDos((prev) => ({
      ...prev,
      [day]: prev[day].map((todo) =>
        todo.id === id ? { ...todo, content: newContent } : todo
      ),
    }));
  };

  const handleDelete = (day: string, id: number) => {
    setToDos((prev) => ({
      ...prev,
      [day]: prev[day].filter((todo) => todo.id !== id),
    }));
  };

  const handleAddButtonClick = (day: string) => {
    addToDo(day);
  };

  return (
    <TemplateLayout>
      <Typography variant={isSmallScreen ? "h4" : "h2"}>
        매일 해야 할 일을 한 입 거리로 나눠보세요.
      </Typography>
      <Grid container spacing={2}>
        {daysOfTheWeek.map(({ label, key }) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Card
              key={key}
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
                    {label}
                  </Typography>
                  <Stack direction="row" gap={0.5}>
                    <Button
                      variant="contained"
                      color="info"
                      size="xsmall"
                      sx={{ background: "#DDDDDD" }}
                      onClick={() => handleAddButtonClick(key)}
                    >
                      추가
                    </Button>
                    <Button variant="contained" color="primary" size="xsmall">
                      저장
                    </Button>
                  </Stack>
                </Stack>
                <Stack gap={0.5}>
                  {(toDos[key] || []).map(({ id, content }) => (
                    <Stack
                      direction="row"
                      key={id}
                      alignItems="center"
                      spacing={1}
                    >
                      <Checkbox sx={{ p: 0 }} />
                      <TextField
                        value={content}
                        onChange={(e) => handleInputChange(e, key, id)}
                        placeholder="할 일을 입력하세요"
                        size="small"
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                        sx={{ input: { padding: 0 } }}
                      />
                      <IconButton
                        onClick={() => handleDelete(key, id)}
                        aria-label="delete"
                      >
                        <CloseIcon
                          sx={{ fontSize: 20, color: "text.disabled" }}
                        />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </TemplateLayout>
  );
};

export default WeekGoals;
