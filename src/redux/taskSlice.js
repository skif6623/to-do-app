// ПЕРЕПИСУЄМ РЕДЮСЕРИ В BUILDERNOTATION
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchTasks, addTask, deleteTask, toggleCompleted } from './operations';

const taskinitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: taskinitialState,
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.unshift(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      })
      .addMatcher(
        isAnyOf(
          fetchTasks.pending,
          addTask.pending,
          deleteTask.pending,
          toggleCompleted.pending
        ),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchTasks.rejected,
          addTask.rejected,
          deleteTask.rejected,
          toggleCompleted.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },

  // extraReducers: {
  //     // PENDING
  //     // REJECTED
  //     // FULFILLED
  //
  //     [deleteTask.fulfilled](state, action) {
  //       state.isLoading = false;
  //       state.error = null;
  //       const index = state.items.findIndex(
  //         task => task.id === action.payload.id
  //       );
  //       state.items.splice(index, 1);
  //     },
  //     [toggleCompleted.fulfilled](state, action) {
  //       state.isLoading = false;
  //       state.error = null;
  //       const index = state.items.findIndex(
  //         task => task.id === action.payload.id
  //       );
  //       state.items.splice(index, 1, action.payload);
  //     },
  //     [toggleCompleted.rejected](state, action) {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     },
  //   },
  //
  // ОБ'ЄКТНА ФОРМА РЕДЮСЕРІВ
  // import { createSlice } from '@reduxjs/toolkit';
  // import { fetchTasks, addTask, deleteTask, toggleCompleted } from './operations';

  // const handlePending = state => {
  //   state.isLoading = true;
  // };

  // const handleRejected = (state, action) => {
  //   state.isLoading = false;
  //   state.error = action.payload;
  // };

  // const taskinitialState = {
  //   items: [],
  //   isLoading: false,
  //   error: null,
  // };

  // const tasksSlice = createSlice({
  //   name: 'tasks',
  //   initialState: taskinitialState,
  //   extraReducers: {
  //     // PENDING
  //     [fetchTasks.pending]: handlePending,
  //     [addTask.pending]: handlePending,
  //     [deleteTask.pending]: handlePending,
  //     [toggleCompleted.pending]: handlePending,
  //     // REJECTED
  //     [fetchTasks.rejected]: handleRejected,
  //     [addTask.rejected]: handleRejected,
  //     [deleteTask.rejected]: handleRejected,
  //     [toggleCompleted.rejected]: handleRejected,
  //     // FULFILLED
  //     [fetchTasks.fulfilled](state, action) {
  //       state.isLoading = false;
  //       state.error = null;
  //       state.items = action.payload;
  //     },
  //     [addTask.fulfilled](state, action) {
  //       state.isLoading = false;
  //       state.error = null;
  //       state.items.unshift(action.payload);
  //     },
  //     [deleteTask.fulfilled](state, action) {
  //       state.isLoading = false;
  //       state.error = null;
  //       const index = state.items.findIndex(
  //         task => task.id === action.payload.id
  //       );
  //       state.items.splice(index, 1);
  //     },
  //     [toggleCompleted.fulfilled](state, action) {
  //       state.isLoading = false;
  //       state.error = null;
  //       const index = state.items.findIndex(
  //         task => task.id === action.payload.id
  //       );
  //       state.items.splice(index, 1, action.payload);
  //     },
  //     [toggleCompleted.rejected](state, action) {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     },
  //   },
  // Синхронні редюсери
  // reducers: {
  //   addTask: {
  //     reducer(state, action) {
  //       return [...state, action.payload];
  //     },
  //     prepare(text) {
  //       return {
  //         payload: {
  //           text,
  //           id: nanoid(),
  //           completed: false,
  //         },
  //       };
  //     },
  //   },
  //   deleteTask(state, action) {
  //     return state.items.filter(task => task.id !== action.payload);
  //   },
  //   toggleCompleted(state, action) {
  //     return state.map(task => {
  //       if (task.id !== action.payload) {
  //         return task;
  //       }
  //       return {
  //         ...task,
  //         completed: !task.completed,
  //       };
  //     });
  //   },
  // },
});

export const tasksReducer = tasksSlice.reducer;
