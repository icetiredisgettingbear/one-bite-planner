"use client";

import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

declare module "@mui/material/styles/createPalette" {
  interface TypeText {
    brand: string;
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsSizeOverrides {
    large: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2D70D6",
      light: "#3179E5",
      dark: "#1D60C5",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#F0F0F0",
      light: "#EFEFEF",
      dark: "#DFDFDF",
      contrastText: "#535353",
    },
    text: {
      primary: "#333333",
      secondary: "#797979",
      disabled: "#BABABA",
      brand: "#2D70D6",
    },
    background: {
      default: "FFFFFF",
      paper: "#F5F5F5",
    },
  },
  typography: {
    fontFamily: "Pretendard",
    h1: { fontSize: "56px", fontWeight: 600 },
    h2: { fontSize: "40px", fontWeight: 600 },
    h3: { fontSize: "36px", fontWeight: 600 },
    h4: { fontSize: "32px", fontWeight: 500 },
    h5: { fontSize: "28px", fontWeight: 500 },
    h6: { fontSize: "24px", fontWeight: 500 },
    subtitle1: { fontSize: "20px", fontWeight: 500 },
    subtitle2: { fontSize: "18px", fontWeight: 500 },
    body1: { fontSize: "16px", fontWeight: 500 },
    body2: { fontSize: "14px", fontWeight: 500 },
    caption: { fontSize: "12px", fontWeight: 500 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          borderBottom: "1px solid #E5E5E5",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "primary" && {
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderColor: theme.palette.primary.main,
            ":hover": {
              boxShadow: "none",
              background: theme.palette.primary.dark,
              color: theme.palette.primary.contrastText,
            },
          }),
          ...(ownerState.color === "info" && {
            background: theme.palette.info.main,
            color: theme.palette.info.contrastText,
            borderColor: theme.palette.info.main,
            ":hover": {
              boxShadow: "none",
              background: theme.palette.info.dark,
            },
          }),
          ...(ownerState.size === "large" && {
            borderRadius: "18px",
            fontSize: "22px",
            height: "64px",
            padding: "0 32px",
            width: "fit-content",
          }),
          ...(ownerState.size === "medium" && {
            borderRadius: "16px",
            fontSize: "20px",
            height: "56px",
            padding: "0 28px",
            width: "fit-content",
          }),
          ...(ownerState.size === "small" && {
            borderRadius: "12px",
            fontSize: "14px",
            height: "40px",
            padding: "0 20px",
            width: "fit-content",
          }),
          fontWeight: 600,
          boxShadow: "none",
          textTransform: "none",
        }),
      },
    },
    MuiTextField: {
      defaultProps: { variant: "standard" },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === "large" && {
            "& .MuiInputBase-root": {
              fontSize: "20px",
              paddingTop: "12px",
              paddingBottom: "12px",
            },
            "& .MuiInputLabel-root": {
              fontSize: "20px",
              top: "8px",
            },
          }),
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "none",
        },
      },
    },
  },
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
export default Provider;
