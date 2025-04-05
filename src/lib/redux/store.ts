
import { configureStore } from '@reduxjs/toolkit/dist/configureStore';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import authReducer from './authSlice';
import { vacayApi } from './api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [vacayApi.reducerPath]: vacayApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vacayApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
