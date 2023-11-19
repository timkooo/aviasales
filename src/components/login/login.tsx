import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { selectUserAuthorized, selectUserName } from '../../store/user/user.selectors';
import { logout } from '../../store/user/user.slice';
import { LoginModal } from '../login-modal/login-modal';

export const Login = () => {
  const userAuthorized = useAppSelector(selectUserAuthorized);
  const userName = useAppSelector(selectUserName);
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLogin = () => {
    setModalVisible(true);
  };

  return (
    <div className="login">
      {!userAuthorized && !userName ? ( <button className="login__button" onClick={handleLogin}>LOGIN</button> ) : (
        <div className="login__item">
          <p className="login__user-name">You logged in as {userName}</p>
          <button className="login__button" onClick={handleLogout}>LOGOUT</button>
        </div>
      )}
      <LoginModal visibility={modalVisible} onChangeVisibility={setModalVisible}/>
    </div>
  );
};
