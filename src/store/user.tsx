import { createSlice } from "@reduxjs/toolkit";
import { getCurrentRole, getCurrentUsername } from "@/hooks/tokenDecoder";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: getCurrentUsername(),
    role: getCurrentRole(),
  },
  reducers: {
    login: (state) => {
      state.username = getCurrentUsername();
      state.role = getCurrentRole();
    },
    logout: (state) => {
      state.username = "";
      state.role = "";
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
