import { createSlice } from "@reduxjs/toolkit";
import { getCurrentRole } from "@/hooks/tokenDecoder";

const userRoleSlice = createSlice({
  name: "userRole",
  initialState: {
    userRole: getCurrentRole(),
  },
  reducers: {
    login: (state) => {
      state.userRole = getCurrentRole();
    },
    logout: (state) => {
      state.userRole = "";
    },
  },
});

export const userRoleActions = userRoleSlice.actions;
export default userRoleSlice.reducer;
