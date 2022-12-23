import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "../actions/userAction";

export type UserState = Partial<User>;

export const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("token");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    [getUser].forEach((thunk) =>
      builder.addCase(thunk.fulfilled, (state, { payload }: PayloadAction<any>) => {
        return { ...state, ...payload };
      }),
    );
    [getUser].forEach((thunk) =>
      builder.addCase(thunk.rejected, () => {
        return initialState;
      }),
    );
  },
});

export const userAction = {
  ...userSlice.actions,
  getUser,
};
