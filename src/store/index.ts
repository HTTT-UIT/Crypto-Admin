import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userSlice";
import { authSlice } from "./reducers/authSlice";
import { blogSlice } from "./reducers/blogSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    auth: authSlice.reducer,
    blog: blogSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
