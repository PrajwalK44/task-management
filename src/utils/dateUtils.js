export const isTaskOverdue = (dueDate) => {
  if (!dueDate) return false;

  return new Date(dueDate) < new Date();
};

export const formatDate = (dateString) => {
  if (!dateString) return "No due date";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
