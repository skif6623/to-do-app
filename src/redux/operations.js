// import {
//   fetchingInProgress,
//   fetchingSuccess,
//   fetchingError,
// } from './taskSlice';

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://63c44b33f0028bf85fa64c21.mockapi.io';

// export const fetchTasks = () => async dispatch => {
//   try {
//     dispatch(fetchingInProgress());
//     const response = await axios.get('/tasks/current');
//     dispatch(fetchingSuccess(response.data));
//   } catch (error) {
//     dispatch(fetchingError(error.message));
//   }
// };

export const fetchTasks = createAsyncThunk(
  'tasks/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/tasks');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (text, thunkAPI) => {
    try {
      const response = await axios.post('/tasks', { text });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const toggleCompleted = createAsyncThunk(
  'tasks/toggleCompleted',
  async (task, thunkAPI) => {
    try {
      const response = await axios.put(`/tasks/${task.id}`, {
        completed: !task.completed,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
