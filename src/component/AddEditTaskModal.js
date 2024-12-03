import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { addTask, editTask } from "../redux/tasksSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { UploadFile as UploadIcon } from "@mui/icons-material";

const AddEditTaskModal = ({ open, onClose, task }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
      setFile(null); // Clear file when editing
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setFile(null);
    }
  }, [task, open]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    const taskData = {
      title,
      description,
      dueDate,
      file,
    };

    if (task) {
      dispatch(
        editTask({
          id: task.id,
          ...taskData,
        })
      );
    } else {
      dispatch(addTask(taskData));
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
      <DialogContent sx={{ pb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
              sx={{ minWidth: "180px" }}
            >
              {file ? "Change File" : "Upload File"}
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept=".png,.jpg,.jpeg,.pdf,.docx,.txt"
              />
            </Button>
            {file && (
              <Typography variant="body2" color="textSecondary">
                {file.name}
              </Typography>
            )}
          </Box>
          {file && (
            <Typography variant="caption" color="textSecondary">
              File: {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {task ? "Update Task" : "Add Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditTaskModal;
