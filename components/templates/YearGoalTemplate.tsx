"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Typography from "@/components/Typography";
import { ChangeEvent, useState, FormEventHandler, useEffect } from "react";
import { useRouter } from "next/navigation";
import TemplateLayout from "../layouts/TemplateLayout";
import Box from "../Box";
import { getCurrentDateInfo } from "@/utils/dateUtils";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getCurrentYearlyGoal } from "@/utils/api/goals/getGoals";
import { YearlyGoal, upsertYearlyGoal } from "@/utils/api/goals/updateGoals";

export default function YearGoalTemplate() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { year } = getCurrentDateInfo();
  const router = useRouter();
  const [yearlyGoal, setYearlyGoal] = useState<YearlyGoal>({
    year,
    goal: "",
    is_achieved: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setYearlyGoal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    upsertYearlyGoal(yearlyGoal);

    router.push("/goals-setup/quarter");
  };

  useEffect(() => {
    const fetchGoal = async () => {
      const fetchedGoal = await getCurrentYearlyGoal();
      fetchedGoal && setYearlyGoal(fetchedGoal);
    };

    fetchGoal();
  }, []);

  return (
    <TemplateLayout>
      <Typography variant={isSmallScreen ? "h4" : "h2"}>
        {year}년, 올해 이루고 싶은 목표는 무엇인가요?
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="goal"
          label="올해 목표"
          placeholder="목표를 알려주세요"
          size={isSmallScreen ? "medium" : "large"}
          fullWidth
          value={yearlyGoal.goal}
          onChange={handleChange}
        />
        <Button
          size="medium"
          type="submit"
          sx={{ mt: 6 }}
          fullWidth={isSmallScreen}
        >
          다음
        </Button>
      </Box>
    </TemplateLayout>
  );
}
