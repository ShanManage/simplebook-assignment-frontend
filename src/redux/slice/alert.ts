import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertStateDto, AlertDto } from '../../interfaces';

const initialState: AlertStateDto = {
  notifications: [],
};

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    createAlert: (state, action: PayloadAction<AlertDto>) => {
      state.notifications.splice(0, state.notifications.length);
      state.notifications.push({
        message: action.payload.message,
        type: '',
        options: {
          key: action.payload.options.key,
          variant: action.payload.options.variant,
          anchorOrigin: action.payload.options.anchorOrigin,
          autoHideDuration: action.payload.options.autoHideDuration,
          persist: action.payload.options.persist,
        },
      });
    },
    clearAlert: (state) => {
      state.notifications.splice(0, state.notifications.length);
    },
  },
});

export const { createAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;
