import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reservationsReducer from './reservationsSlice'
import customerReducer from './customerSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    reservations: reservationsReducer,
    customer: customerReducer,
    ui: uiReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
