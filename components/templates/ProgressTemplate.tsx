"use client";

import Typography from "@/components/Typography";
import Box from "../Box";
import TemplateLayout from "../layouts/TemplateLayout";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ProgressTemplate() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <TemplateLayout>
      <Typography variant={isSmallScreen ? "h4" : "h2"}>
        목표를 향해 얼마큼 해냈는지 확인해 보세요.
      </Typography>
      <Box
        width="100%"
        height={300}
        bgcolor="background.paper"
        borderRadius={4}
      />
    </TemplateLayout>
  );
}
