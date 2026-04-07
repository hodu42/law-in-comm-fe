import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./search";
import chatWidgetReducer from "./chatWidget";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    chatWidget: chatWidgetReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
