import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Button,
} from "@mui/material";
import store from "./redux/store";
import TaskList from "./component/TaskList";
import { toggleDarkMode, selectDarkMode } from "./redux/themeSlice";

function ThemedApp() {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#3f51b5",
        light: "#7986cb",
        dark: "#303f9f",
      },
      background: darkMode
        ? { default: "#121212", paper: "#1e1e1e" }
        : { default: "#f4f6f9", paper: "#ffffff" },
      text: darkMode
        ? { primary: "#ffffff", secondary: "#b0b0b0" }
        : { primary: "#2c3e50", secondary: "#6c757d" },
      success: {
        main: "#4caf50",
        light: "#81c784",
      },
      error: {
        main: "#f44336",
        light: "#e57373",
      },
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
      h4: {
        fontWeight: 700,
        letterSpacing: "-0.5px",
      },
      body1: {
        lineHeight: 1.6,
      },
    },
    components: {
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            marginBottom: 12,
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
            fontWeight: 600,
            transition: "all 0.3s ease",
          },
          contained: {
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            "&:hover": {
              boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode
            ? "linear-gradient(135deg, #2e2e2e 0%, #1e1e1e 100%)"
            : "linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)",
          py: 4,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(toggleDarkMode())}
          sx={{ marginBottom: 2 }}
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </Button>
        <Router>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/tasks" element={<TaskList />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
}

export default App;
