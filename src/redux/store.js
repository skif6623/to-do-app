import { configureStore } from '@reduxjs/toolkit';
import { taskReducer, filtersReducer } from './reducer';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    filters: filtersReducer,
  },
});
