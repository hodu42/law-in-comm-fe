import { createSlice } from "@reduxjs/toolkit";

const chatWidgetSlice = createSlice({
  name: "chatWidget",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openChat: (state) => {
      state.isOpen = true;
    },
    closeChat: (state) => {
      state.isOpen = false;
    },
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const chatWidgetActions = chatWidgetSlice.actions;
export default chatWidgetSlice.reducer;
