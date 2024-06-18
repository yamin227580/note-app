import { createTheme } from "@mui/material/styles";
export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#F3CA52",
    },
    secondary: {
      main: "#F6E9B2",
    },
    info: {
      main: "#E2DFD0",
    },
    success: {
      main: "#A34343",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#0A6847",
    },
    secondary: {
      main: "#1D2A35",
    },
    info: {
      main: "#E2DFD0",
    },
    success: {
      main: "#23272F",
    },
  },
});
