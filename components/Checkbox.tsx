"use client";

import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material";

export interface CheckboxProps extends MuiCheckboxProps {}

export default function Checkbox({ ...props }: CheckboxProps) {
  return <MuiCheckbox {...props} />;
}
