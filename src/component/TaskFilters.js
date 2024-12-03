import React from "react";
import { Box, Button, Tooltip, useTheme } from "@mui/material";
import {
  ListAlt as AllIcon,
  CheckCircle as CompleteIcon,
  PendingOutlined as PendingIcon,
  ErrorOutline as OverdueIcon,
} from "@mui/icons-material";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TaskFilters = ({ currentFilter, onFilterChange }) => {
  const theme = useTheme();

  const filters = [
    {
      label: "All Tasks",
      value: "all",
      icon: <AllIcon fontSize="medium" />, // Slightly larger icon
    },
    {
      label: "Completed",
      value: "completed",
      icon: <CompleteIcon fontSize="medium" />,
    },
    {
      label: "Pending",
      value: "pending",
      icon: <PendingIcon fontSize="medium" />,
    },
    {
      label: "Overdue",
      value: "overdue",
      icon: <OverdueIcon fontSize="medium" />,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2, // Increased gap between buttons
        mb: 3,
        pl: 2,
      }}
    >
      <style>{`
        .filter-transition-enter {
          opacity: 0;
          transform: scale(0.9);
        }
        .filter-transition-enter-active {
          opacity: 1;
          transform: scale(1);
          transition: opacity 300ms, transform 300ms;
        }
        .filter-transition-exit {
          opacity: 1;
          transform: scale(1);
        }
        .filter-transition-exit-active {
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 300ms, transform 300ms;
        }
      `}</style>
      <TransitionGroup component={null}>
        {filters.map((filter) => (
          <CSSTransition
            key={filter.value}
            timeout={300}
            classNames="filter-transition"
          >
            <Tooltip title={filter.label} placement="right">
              <Button
                startIcon={filter.icon}
                color={currentFilter === filter.value ? "primary" : "inherit"}
                variant={
                  currentFilter === filter.value ? "contained" : "outlined"
                }
                onClick={() => onFilterChange(filter.value)}
                sx={{
                  width: "200px", // Increased button width
                  height: "60px", // Increased button height
                  fontSize: "1.1rem", // Increased font size
                  px: 3, // Increased horizontal padding
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                  position: "relative",
                  zIndex: currentFilter === filter.value ? 10 : 1,
                  boxShadow:
                    currentFilter === filter.value
                      ? `0 6px 15px rgba(63, 81, 181, 0.4)`
                      : "none",
                  backgroundColor:
                    currentFilter === filter.value
                      ? theme.palette.primary.main
                      : "transparent",
                  color:
                    currentFilter === filter.value
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.primary,
                }}
              >
                {filter.label}
              </Button>
            </Tooltip>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Box>
  );
};

export default TaskFilters;
