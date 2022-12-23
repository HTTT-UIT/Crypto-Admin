import { RootState } from "./";

export const selectUser = (state: RootState) => state.user;
export const selectBlog = (state: RootState) => state.blog;
