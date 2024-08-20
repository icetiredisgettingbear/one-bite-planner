"use client";

import {
  Container as MuiContainer,
  ContainerProps as MuiContainerProps,
} from "@mui/material";

export interface ContainerProps extends MuiContainerProps {}

export default function Container({ ...props }: ContainerProps) {
  return <MuiContainer {...props} />;
}
