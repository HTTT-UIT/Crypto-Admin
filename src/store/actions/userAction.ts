import { userApi } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getUser = createAsyncThunk("users", async (data: any, { rejectWithValue }) => {
  try {
    const res = await userApi.getUser(data);
    return res.data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response.data);
    }
  }
});

export { getUser };
