import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface User {
  id: number;
  name: string;
  isAdm: boolean;
  token: string;
}

interface Action {
  payload: null | User;
  type: string;
}

export interface userSliceProps {
  user: null | User;
}

const initialState: userSliceProps = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: Action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectedUser = (state: RootState) => state.user.user;

export const userReducer = userSlice.reducer;
