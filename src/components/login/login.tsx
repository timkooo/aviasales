import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { selectUserAuthorized, selectUserName } from '../../store/user/user.selectors';
import { logout } from '../../store/user/user.slice';

export const Login = () => {
  const userAuthorized = useAppSelector(selectUserAuthorized);
  const userName = useAppSelector(selectUserName);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return !userAuthorized && !userName ? (
    <button>LOGIN</button>
  ) : (
    <React.Fragment>
      <p>{userName}</p>
      <button onClick={handleLogout}>LOGOUT</button>
    </React.Fragment>
  );
};
