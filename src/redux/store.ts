import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "@features/auth/authSlice";
import layoutSlice from "@features/layout/layoutSlice.ts";
import playMusicSlice from "@features/play/musicPlaySlice.ts";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    layout: layoutSlice.reducer,
    play: playMusicSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;