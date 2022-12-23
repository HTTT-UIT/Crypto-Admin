import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getList } from "../actions/blogAction";

export type AuthState = Partial<{
  items: Blog[];
  page: number;
  pageSize: number;
  totalRow: number;
}>;

export const initialState: AuthState = {
  items: [],
  page: 0,
  pageSize: 0,
  totalRow: 0,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("token");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    [getList].forEach((thunk) =>
      builder.addCase(thunk.fulfilled, (state, { payload }: PayloadAction<any>) => {
        return { ...state, ...payload };
      }),
    );
    [getList].forEach((thunk) =>
      builder.addCase(thunk.rejected, () => {
        return initialState;
      }),
    );
  },
});

export const authAction = {
  ...blogSlice.actions,
  getList,
};
