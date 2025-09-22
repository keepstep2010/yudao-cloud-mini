import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import authSlice from './slices/authSlice';
import projectSlice from './slices/projectSlice';
import dddSlice from './slices/dddSlice';
import screenSlice from './slices/screenSlice';
import generationSlice from './slices/generationSlice';

import { api } from '@services/api';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    project: projectSlice,
    ddd: dddSlice,
    screen: screenSlice,
    generation: generationSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [api.util.resetApiState.type],
      },
    }).concat(api.middleware),
});

// 启用RTK Query的refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


