import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../config/api";

// Fetch
export const fetchTreatments = createAsyncThunk("treatments/fetch", async () => {
  const res = await axios.get(`${API_BASE_URL}/treatments`);
  return res.data;
});

// Add
export const addTreatment = createAsyncThunk("treatments/add", async (treatment, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/treatments`, treatment);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

// Delete
export const deleteTreatment = createAsyncThunk("treatments/delete", async (id) => {
  await axios.delete(`${API_BASE_URL}/treatments/${id}`);
  return id;
});

const treatmentSlice = createSlice({
  name: "treatments",
  initialState: { list: [], error: null },
  reducers: {
    clear: (state) => {
      state.list = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreatments.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addTreatment.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.error = null;
      })
      .addCase(addTreatment.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteTreatment.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t.id !== action.payload);
      });
  },
});

export const { clear } = treatmentSlice.actions;
export default treatmentSlice.reducer;
