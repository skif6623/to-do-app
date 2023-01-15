export const fetchTasksFulfilledReducer = (state, action) => {
  state.items = action.payload;
};

export const addTaskFulfilledReducer = (state, action) => {
  state.items.unshift(action.payload);
};

export const deleteTaskFulfilledReducer = (state, action) => {
  const index = state.items.findIndex(task => task.id === action.payload.id);
  state.items.splice(index, 1);
};

export const toggleCompletedFulfilledReducer = (state, action) => {
  const index = state.items.findIndex(task => task.id === action.payload.id);
  state.items.splice(index, 1, action.payload);
};

export const anyPendingReducer = state => {
  state.isLoading = true;
};
export const anyRejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
export const anyFulfilledReducer = state => {
  state.isLoading = false;
  state.error = null;
};
