"use client";

import Button from "@/components/Button";
import TextField from "@/components/TextField";
import Typography from "@/components/Typography";
import { ChangeEvent, useState, FormEventHandler } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import TemplateLayout from "../layouts/TemplateLayout";
import Box from "../Box";
import { getCurrentDateInfo } from "@/utils/dateUtils";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function YearGoalTemplate() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const supabase = createClient();
  const router = useRouter();
  const [formData, setFormData] = useState({ yearlyGoal: "" });
  const { year } = getCurrentDateInfo();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("yearly_goals")
      .insert({ is_achieved: false, year, goal: formData.yearlyGoal });

    if (error) {
      console.error("Error inserting yearly goals:", error.message);
      return;
    }

    router.push("/goals-setup/quarter");
  };

  return (
    <TemplateLayout>
      <Typography variant={isSmallScreen ? "h4" : "h2"}>
        {year}년, 올해 이루고 싶은 목표는 무엇인가요?
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="yearlyGoal"
          label="올해 목표"
          placeholder="올해 목표를 알려주세요"
          size={isSmallScreen ? "medium" : "large"}
          fullWidth
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
