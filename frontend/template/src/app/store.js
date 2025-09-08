import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import treatmentReducer from "../features/treatments/treatmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    treatments: treatmentReducer,
  },
});
