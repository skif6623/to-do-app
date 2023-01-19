// ПЕРЕПИСУЄМ РЕДЮСЕРИ В BUILDERNOTATION
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchTasks, addTask, deleteTask, toggleCompleted } from './operations';
import {
  fetchTasksFulfilledReducer,
  addTaskFulfilledReducer,
  deleteTaskFulfilledReducer,
  toggleCompletedFulfilledReducer,
  anyPendingReducer,
  anyRejectedReducer,
  anyFulfilledReducer,
} from './taskSliceReducers';

const extraActions = [fetchTasks, addTask, deleteTask, toggleCompleted];

const getActions = type => isAnyOf(...extraActions.map(action => action[type]));

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
      .addCase(fetchTasks.fulfilled, fetchTasksFulfilledReducer)
      .addCase(addTask.fulfilled, addTaskFulfilledReducer)
      .addCase(deleteTask.fulfilled, deleteTaskFulfilledReducer)
      .addCase(toggleCompleted.fulfilled, toggleCompletedFulfilledReducer)
      .addMatcher(getActions('pending'), anyPendingReducer)
      .addMatcher(getActions('rejected'), anyRejectedReducer)
      .addMatcher(getActions('fulfilled'), anyFulfilledReducer);
  },
});

export const tasksReducer = tasksSlice.reducer;
