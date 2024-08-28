"use client";

import Typography from "@/components/Typography";
import TemplateLayout from "../layouts/TemplateLayout";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grass from "../Grass";
import { useEffect, useState } from "react";
import { getCurrentYearlyGoal } from "@/utils/api/goals/getGoals";

type CurrentGoalInfo = {
  yearlyGoal: string | null;
};

export default function ProgressTemplate() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [currentGoalInfo, setCurrentGoalInfo] = useState<CurrentGoalInfo>({
    yearlyGoal: null,
  });

  useEffect(() => {
    const fetchGoal = async () => {
      const fetchedYearlyGoal = await getCurrentYearlyGoal();
      setCurrentGoalInfo({ yearlyGoal: fetchedYearlyGoal?.goal });
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
        {currentGoalInfo.yearlyGoal}
      </Typography>
      <Typography variant={isSmallScreen ? "h4" : "h2"}>
        목표를 향해 얼마큼 해냈는지 확인해 보세요.
      </Typography>
      <Grass />
    </TemplateLayout>
  );
}
