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
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },
    divider: "E5E5E5",
  },
  typography: {
    fontFamily: "Pretendard Variable",
    h1: { fontSize: "56px", fontWeight: 600 },
    h2: { fontSize: "40px", fontWeight: 600 },
    h3: { fontSize: "36px", fontWeight: 600 },
    h4: { fontSize: "32px", fontWeight: 600 },
    h5: { fontSize: "28px", fontWeight: 600 },
    h6: { fontSize: "24px", fontWeight: 600 },
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
            borderRadius: "14px",
            fontSize: "20px",
            height: "64px",
            padding: "0 32px",
          }),
          ...(ownerState.size === "medium" && {
            borderRadius: "12px",
            fontSize: "18px",
            height: "56px",
            padding: "0 28px",
          }),
          ...(ownerState.size === "small" && {
            borderRadius: "10px",
            fontSize: "14px",
            height: "40px",
            padding: "0 20px",
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
        root: ({ ownerState }) => {
          const { size, variant } = ownerState;

          if (variant === "standard") {
            if (size === "large") {
              return {
                "& .MuiInputBase-root": {
                  fontSize: "20px",
                  paddingTop: "12px",
                  paddingBottom: "8px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "20px",
                  top: "12px",
                },
              };
            } else if (size === "medium") {
              return {
                "& .MuiInputBase-root": {
                  fontSize: "18px",
                  paddingTop: "6px",
                  paddingBottom: "4px",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "18px",
                  top: "6px",
                },
              };
            }
          }

          if (variant === "outlined") {
            if (size === "medium") {
              return {
                "& .MuiInputBase-root": {
                  borderRadius: "12px",
                  fontSize: "18px",
                  height: "56px",
                },
              };
            }
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
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
