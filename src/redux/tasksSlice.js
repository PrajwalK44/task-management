import { createSlice, nanoid } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    searchtext:'',
  },
  
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: ({ title, description, dueDate }) => ({
        payload: {
          id: nanoid(),
          title,
          description,
          dueDate,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      }),
    },

    editTask: (state, action) => {
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },

    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.items.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },

    addSearchText: (state, action)=> {
      state.searchtext=action.payload
    }
  },
});

export const { addTask, editTask, deleteTask, toggleTaskCompletion, addSearchText } =
  tasksSlice.actions;

export default tasksSlice.reducer;
