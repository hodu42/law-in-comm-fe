import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search", // 액션 타입의 접두사
    initialState: { // 초기 상태
        keyword: "",
        category: "",
     }, 
    reducers: { // 리듀서 함수들
        setKeyword: (state, action) => {
            state.keyword = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        }
    },
});

export const searchActions = searchSlice.actions; // 액션 export
export default searchSlice.reducer; // 리듀서 export