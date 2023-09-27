import { createSlice } from '@reduxjs/toolkit';

const initialState = { message: '' };

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload.message,
      };
    },
    clearNotification(state, action) {
      return {
        message: '',
      };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const setNotificationThunk = (message, timer) => {
  return dispatch => {
    dispatch({
      type: setNotification.type,
      payload: { message },
    });

    setTimeout(() => {
      dispatch({ type: clearNotification.type });
    }, timer * 1000); // Convert seconds to milliseconds
  };
};

export default notificationSlice.reducer;

