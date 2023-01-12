import { createSlice } from '@reduxjs/toolkit';
import { fetchTasks } from './operations';
import { nanoid } from 'nanoid';

// [
//   { id: 0, text: 'Learn HTML and CSS', completed: true },
//   { id: 1, text: 'Get good at JavaScript', completed: true },
//   { id: 2, text: 'Master React', completed: false },
//   { id: 3, text: 'Discover Redux', completed: false },
//   { id: 4, text: 'Build amazing apps', completed: false },
// ]

const taskinitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: taskinitialState,
  extraReducers: {
    [fetchTasks.pending](state) {
      state.isLoading = true;
    },
    [fetchTasks.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchTasks.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // addTask: {
    //   reducer(state, action) {
    //     return [...state, action.payload];
    //   },
    //   prepare(text) {
    //     return {
    //       payload: {
    //         text,
    //         id: nanoid(),
    //         completed: false,
    //       },
    //     };
    //   },
    // },
    // deleteTask(state, action) {
    //   return state.filter(task => task.id !== action.payload);
    // },
    // toggleCompleted(state, action) {
    //   return state.map(task => {
    //     if (task.id !== action.payload) {
    //       return task;
    //     }
    //     return {
    //       ...task,
    //       completed: !task.completed,
    //     };
    //   });
    // },
  },
});
// export const { addTask, deleteTask, toggleCompleted, fetchingInProgress, fetchingSuccess, fetchingError } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
