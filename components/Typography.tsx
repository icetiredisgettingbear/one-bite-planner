"use client";

import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from "@mui/material";

const customColors = ["primary", "secondary", "disabled", "brand"] as const;
type TypographyCustomColor = (typeof customColors)[number];

export interface TypographyProps extends Omit<MuiTypographyProps, "color"> {
  color?: TypographyCustomColor | MuiTypographyProps["color"];
}

export default function Typography({
  color = "primary",
  ...props
}: TypographyProps) {
  const isCustomColor = (color: any): color is TypographyCustomColor =>
    customColors.includes(color);

  const typographyColor = isCustomColor(color) ? `text.${color}` : color;

  return <MuiTypography color={typographyColor} {...props} />;
}
