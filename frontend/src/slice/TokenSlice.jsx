import { createSlice } from "@reduxjs/toolkit";
const initialState = null;
const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    addToken(state, action) {
      return action.payload;
    },
    logout() {
      return initialState;
    },
  },
});
export const {addToken,logout}=tokenSlice.actions
export default tokenSlice.reducer
