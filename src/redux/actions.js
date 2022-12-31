import { createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const addTask = createAction('tasks/addTask', text => ({
  payload: {
    text,
    id: nanoid(),
    completed: false,
  },
}));
export const deleteTask = createAction('tasks/deleteTask');
export const toggleCompleted = createAction('tasks/toggleCompleted');
export const setStatusFilter = createAction('tasks/setStatusFilter');
