import React from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  
} from "@mui/icons-material";
import { formatDate, isTaskOverdue } from "../utils/dateUtils";
import {CheckBoxOutlineBlank} from "@mui/icons-material";
import {CheckCircleOutline}  from "@mui/icons-material";
const TaskItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const { id, title, description, dueDate, completed } = task;

  return (
    <ListItem
      sx={{
        backgroundColor: completed
          ? "rgba(76, 175, 80, 0.08)"
          : isTaskOverdue(dueDate)
          ? "rgba(244, 67, 54, 0.08)"
          : "background.paper",
        borderRadius: 2,
        mb: 2,
        border: "1px solid",
        borderColor: completed
          ? "success.light"
          : isTaskOverdue(dueDate)
          ? "error.light"
          : "divider",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        },
      }}
      secondaryAction={
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => onEdit(task)}
            sx={{
              mr: 1,
              color: "text.secondary",
              "&:hover": { color: "primary.main" },
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDelete(id)}
            sx={{
              color: "error.light",
              "&:hover": { color: "error.main" },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      }
    >
      <Checkbox
        checked={completed}
        onChange={() => onToggleComplete(id)}
        icon={<CheckBoxOutlineBlank />} // Empty circle for unchecked state
        checkedIcon={<CheckCircleOutline color="success" />} // Filled circle for checked state
        sx={{
          "&:hover": {
            backgroundColor: "rgba(76, 175, 80, 0.1)", // Light green hover effect
          },
        }}
      />
      <ListItemText
        primary={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 0.5,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                textDecoration: completed ? "line-through" : "none",
                mr: 2,
                fontWeight: completed ? 400 : 500,
                color: completed ? "text.secondary" : "text.primary",
              }}
            >
              {title}
            </Typography>
            {isTaskOverdue(dueDate) && !completed && (
              <Chip
                label="Overdue"
                color="error"
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.675rem",
                }}
              />
            )}
          </Box>
        }
        secondary={
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {description || "No description"}
            </Typography>
            <Typography
              variant="caption"
              color={
                isTaskOverdue(dueDate) && !completed
                  ? "error.main"
                  : "text.secondary"
              }
            >
              Due: {formatDate(dueDate)}
            </Typography>
          </Box>
        }
      />
    </ListItem>
  );
};

export default TaskItem;
