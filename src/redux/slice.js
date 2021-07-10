import { createSlice } from "@reduxjs/toolkit";

const initialStateSession = {
  token: null,
  user: {},
};

const sessionSlice = createSlice({
  name: "session",
  initialState: initialStateSession,
  reducers: {
    setToken: (state, { payload }) => ({ ...state, token: payload }),
    setUserInfo: (state, { payload }) => ({ ...state, user: payload }),
    loginOut: (state) => ({ ...state, token: null, user: {} }),
    modalLogout: (state, { payload }) => ({ ...state, modal: payload }),
  },
});


export const session = sessionSlice.reducer;
export const {
  setToken,
  setUserInfo,
  loginOut,
  modalLogout,
} = sessionSlice.actions;
