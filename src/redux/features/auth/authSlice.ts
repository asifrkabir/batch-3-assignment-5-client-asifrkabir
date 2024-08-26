import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TAuthUser } from "../../../types";

type TAuthState = {
  user: null | TAuthUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;

export const selectCurrentUser = (state: RootState) =>
  state.persisted.auth.user;
export const selectCurrentToken = (state: RootState) =>
  state.persisted.auth.token;
