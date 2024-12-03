import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Utility function for checking overdue tasks
const isTaskOverdue = (dueDate) => {
  return dueDate ? new Date(dueDate) < new Date() : false;
};

const TaskChart = () => {
  const tasks = useSelector((state) => state.tasks.items || []);

  // Categorize tasks
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const overdueTasks = tasks.filter(
    (task) => !task.completed && isTaskOverdue(task.dueDate)
  ).length;

  // Chart data
  const data = {
    labels: ["Completed", "Pending", "Overdue"],
    datasets: [
      {
        label: "Number of Tasks",
        data: [completedTasks, pendingTasks, overdueTasks],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
        borderColor: ["#388e3c", "#f57c00", "#d32f2f"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Task Status Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div
      style={{
        height: "300px",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default TaskChart;
