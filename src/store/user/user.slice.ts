import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpaces } from '../../const';

export type InitialState = {
  userName: string | null;
  error: string | null;
  userAuthorized: boolean;
};

const initialState: InitialState = {
  userName: null,
  error: null,
  userAuthorized: false
};

export const userSlice = createSlice({
  name: NameSpaces.User,
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<string>) {
      state.userName = action.payload;
      state.error = null;
      state.userAuthorized = true;
    },
    loginFail(state, action: PayloadAction<string>) {
      state.userName = null;
      state.error = action.payload;
      state.userAuthorized = false;
    },
    logout(state) {
      state.userName = null;
      state.error = null;
      state.userAuthorized = false;
    }
  },
  extraReducers: {}
});

export const { loginSuccess, loginFail, logout } = userSlice.actions;
