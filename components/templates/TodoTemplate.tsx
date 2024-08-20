"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Typography from "@/components/Typography";
import { createClient } from "@/utils/supabase/client";
import { ChangeEvent, useState, FormEventHandler } from "react";
import TemplateLayout from "../layouts/TemplateLayout";
import Card from "../Card";
import Stack from "../Stack";
import Checkbox from "../Checkbox";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const daysOfTheWeek = [
  { label: "월요일", key: "Mon" },
  { label: "화요일", key: "Tue" },
  { label: "수요일", key: "Wed" },
  { label: "목요일", key: "Thu" },
  { label: "금요일", key: "Fri" },
  { label: "토요일", key: "Sat" },
  { label: "일요일", key: "Sun" },
];

export default function TodoTemplate() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const supabase = createClient();
  const [formData, setFormData] = useState({
    toDoGoalMon: [],
    toDoGoalTue: [],
    toDoGoalWed: [],
    toDoGoalThu: [],
    toDoGoalFri: [],
    toDoGoalSat: [],
    toDoGoalSun: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
  };

  return (
    <TemplateLayout>
      <Typography variant={isSmallScreen ? "h4" : "h2"}>
        매일 해야 할 일을 한 입 거리로 나눠보세요.
      </Typography>
      <Stack gap={2}>
        {daysOfTheWeek.map(({ label, key }) => (
          <Card
            key={key}
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              px: 3,
              py: 2.5,
              bgcolor: "background.paper",
              gap: 1.5,
            }}
            onSubmit={handleSubmit}
          >
            <Typography
              variant="caption"
              fontWeight={600}
              color="brand"
              py={0.25}
              px={1}
              bgcolor="#E3ECF8"
              borderRadius={1.5}
              width="fit-content"
            >
              {label}
            </Typography>
            <Stack gap={1}>
              <Stack direction="row" gap={1} alignItems="center">
                <Checkbox checked={true} sx={{ p: 0 }} />
                <TextField
                  name={`toDoGoal${key}`}
                  placeholder="목표를 알려주세요"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                  InputProps={{ disableUnderline: true }}
                  sx={{ input: { padding: 0 } }}
                />
              </Stack>
              <Stack direction="row" gap={1} alignItems="center">
                <Checkbox checked={false} sx={{ p: 0 }} />
                <TextField
                  name={`toDoGoal${key}`}
                  placeholder="목표를 알려주세요"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                  InputProps={{ disableUnderline: true }}
                  sx={{ input: { padding: 0 } }}
                />
              </Stack>
            </Stack>
          </Card>
        ))}
      </Stack>
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
        <Button
          variant="contained"
          size="medium"
          type="submit"
          fullWidth={isSmallScreen}
        >
          저장
        </Button>
      </Stack>
    </TemplateLayout>
  );
}
