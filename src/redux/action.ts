import authSlice from "@features/auth/authSlice";
import layoutSlice from "@features/layout/layoutSlice.ts";
import musicPlaySlice from "@features/play/musicPlaySlice.ts";





export const useLayoutAction = () => {
  return layoutSlice.actions;
}

export const usePlayActions = () => {
  return musicPlaySlice.actions;
}
export const useAuthAction = () => {
  return authSlice.actions;
};


