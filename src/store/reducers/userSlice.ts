import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "../actions/userActions";

export type UserState = Partial<{
  user: User;
}>;

export const initialState: UserState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const userActions = {
  ...userSlice.actions,
  getUser,
};
