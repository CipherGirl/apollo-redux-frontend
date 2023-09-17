import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import userReducer from './features/user/userSlice';
import filterReducer from './features/filter/filterSlice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
