import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "../actions/authAction";

export type AuthState = Partial<{
  token: string;
  refreshToken: string;
}>;

export const initialState: AuthState = {
  token: undefined,
  refreshToken: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      localStorage.clear();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    [login].forEach((thunk) =>
      builder.addCase(thunk.fulfilled, (state, { payload }: PayloadAction<any>) => {
        return { ...state, ...payload };
      }),
    );
    [login].forEach((thunk) =>
      builder.addCase(thunk.rejected, () => {
        return initialState;
      }),
    );
  },
});

export const authAction = {
  ...authSlice.actions,
  login,
};
