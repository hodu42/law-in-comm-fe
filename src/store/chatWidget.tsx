import { createSlice } from "@reduxjs/toolkit";

const chatWidgetSlice = createSlice({
  name: "chatWidget",
  initialState: {
    isOpen: false,
    selectedChatroomId: null,
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
    setChatroomId: (state, action) => {
      state.selectedChatroomId = action.payload;
    },
    clearChatroomId: (state) => {
      state.selectedChatroomId = null;
    },
  },
});

export const chatWidgetActions = chatWidgetSlice.actions;
export default chatWidgetSlice.reducer;
