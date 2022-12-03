import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "../services/authAPI";
import { notesAPI } from "../services/notesAPI";

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    [notesAPI.reducerPath]: notesAPI.reducer,
  },
});
