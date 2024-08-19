"use client";

import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

export interface ButtonProps extends MuiButtonProps {}

export default function Button({ ...props }: ButtonProps) {
  return <MuiButton {...props} />;
}
