import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: sessionStorage.getItem("token") || null,
  userId: sessionStorage.getItem("userId") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { token, userId } = action.payload;
      state.token = token;
      state.userId = userId;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", userId); // Keep naming consistent
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      sessionStorage.clear();
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
