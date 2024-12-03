import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  Typography,
  Box,
  Button,
  Paper,
  Fade,
  useTheme,
  IconButton,
  Tooltip,
  useMediaQuery,
  TextField,
} from "@mui/material";
import {
  Add as AddIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import TaskItem from "./TaskItem";
import AddEditTaskModal from "./AddEditTaskModal";
import TaskFilters from "./TaskFilters";
import {
  deleteTask,
  toggleTaskCompletion,
  addSearchText,
} from "../redux/tasksSlice";
import { isTaskOverdue } from "../utils/dateUtils";
import TaskChart from "./TaskChart";

const TaskList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.tasks.searchtext);

  const tasks = useSelector((state) => {
    const filteredTasks = state.tasks.items.filter((task) => {
      switch (filter) {
        case "completed":
          return task.completed;
        case "pending":
          return !task.completed;
        case "overdue":
          return !task.completed && isTaskOverdue(task.dueDate);
        default:
          return true;
      }
    });

    return filteredTasks.filter((task) =>
      task.title.toLowerCase().includes(state.tasks.searchtext.toLowerCase())
    );
  });

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleToggleComplete = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: isMobile ? "center" : "space-between",
        alignItems: isMobile ? "stretch" : "flex-start",
        gap: isMobile ? 2 : 3,
        mt: 4,
      }}
    >
     
      <Box
        sx={{
          width: isMobile ? "100%" : "10%",
          position: isMobile ? "relative" : "sticky",
          top: isMobile ? "unset" : 0,
        }}
      >
        <TaskFilters currentFilter={filter} onFilterChange={setFilter} />
      </Box>

     
      <Box
        sx={{
          width: isMobile ? "100%" : "85%",
          mt: isMobile ? 2 : 0,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            p: isMobile ? 2 : 4,
            boxShadow: isDarkMode
              ? "0 10px 25px rgba(0,0,0,0.2)"
              : "0 10px 25px rgba(0,0,0,0.1)",
            background: isDarkMode
              ? "linear-gradient(to right bottom, #2c3e50, #34495e)"
              : "linear-gradient(to right bottom, #ffffff, #f9fafb)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              mb: 3,
              pb: 2,
              borderBottom: "1px solid",
              borderColor: isDarkMode ? "divider" : "divider",
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              sx={{
                fontWeight: 700,
                background: isDarkMode
                  ? "linear-gradient(45deg, #7986cb, #2196f3)"
                  : "linear-gradient(45deg, #3f51b5, #2196f3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Task Management
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "row" : "row",
                alignItems: "center",
                gap: 1,
                mt: isMobile ? 2 : 0,
              }}
            >
              <Tooltip title="Notifications">
                <IconButton>
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Settings">
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="User Profile">
                <IconButton>
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsModalOpen(true)}
              >
                Add Task
              </Button>
            </Box>
          </Box>

    
          <TextField
            variant="outlined"
            placeholder="Search tasks..."
            value={searchText}
            onChange={(e) => dispatch(addSearchText(e.target.value))}
            fullWidth
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
                backgroundColor: isDarkMode ? "#424242" : "#f3f4f6",
              },
            }}
          />

        
          {tasks.length === 0 ? (
            <Fade in={true}>
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  mt: 4,
                  color: "text.secondary",
                  fontStyle: "italic",
                }}
              >
                No tasks found. Start by adding a new task!
              </Typography>
            </Fade>
          ) : (
            <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Fade in={true}>
                <Box>
                  {tasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onDelete={handleDelete}
                      onToggleComplete={handleToggleComplete}
                      onEdit={handleEditClick}
                    />
                  ))}
                </Box>
              </Fade>
            </List>
          )}

          <Box sx={{ mt: 3, height: "250px" }}>
            <TaskChart />
          </Box>
          <br/>
          
        </Paper>
      </Box>

    
      <AddEditTaskModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        task={editingTask}
      />
    </Box>
  );
};

export default TaskList;
