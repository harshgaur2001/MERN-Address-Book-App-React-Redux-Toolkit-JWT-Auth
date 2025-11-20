import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";

export const fetchAddresses = createAsyncThunk(
  "address/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/api/v1/auth/address");
      return res.data.data; // full list
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

export const addAddress = createAsyncThunk(
  "address/add",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/api/v1/auth/address", data);
      toast.success("Address added!");
      return res.data.data; // new address object
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/api/v1/auth/address/${id}`, data);
      toast.success("Address updated!");
      return res.data.data; // updated address object
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/api/v1/auth/address/${id}`);
      toast.success("Address deleted!");
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD */
      .addCase(addAddress.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      /* UPDATE */
      .addCase(updateAddress.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.list.findIndex((a) => a._id === updated._id);
        if (index !== -1) state.list[index] = updated;
      })

      /* DELETE */
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.list = state.list.filter((a) => a._id !== action.payload);
      });
  },
});

export default addressSlice.reducer;
