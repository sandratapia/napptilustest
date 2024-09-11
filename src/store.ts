import { configureStore } from "@reduxjs/toolkit";
import oompaLoompasReducer from "./features/oompaLoompasSlice";

export const store = configureStore({
  reducer: {
    oompaLoompas: oompaLoompasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
