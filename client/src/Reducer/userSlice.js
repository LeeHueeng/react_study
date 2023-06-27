import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    displayName: "",
    uid: "",
    accessToken: "",
    userNum: "",
  },
  reducers: {
    loginUser: (state, action) => {
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.accessToken = action.payload.accessToken;
      state.userNum = action.payload.userNum;
    },
    clearUser: (state) => {
      state.displayName = "";
      state.uid = "";
      state.accessToken = "";
      state.userNum = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
