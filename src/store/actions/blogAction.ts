import blogApi from "@/api/blogApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getList = createAsyncThunk("blog/getlist", async (req: any, { rejectWithValue }) => {
  try {
    const res = await blogApi.getList(req);
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

export { getList };
