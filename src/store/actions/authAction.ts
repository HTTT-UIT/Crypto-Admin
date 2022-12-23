import authApi from "@/api/authApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const login = createAsyncThunk("auth/login", async (user: any, { rejectWithValue }) => {
  try {
    const res = await authApi.login(user);

    var token = res.data?.token;
    localStorage.setItem("token", token);

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

export { login };
