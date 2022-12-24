import { configureStore } from "@reduxjs/toolkit";
import rememberReducer from "../features/remember/rememberSlice";

export default configureStore({
  reducer: {
    remember: rememberReducer,
  },
});
