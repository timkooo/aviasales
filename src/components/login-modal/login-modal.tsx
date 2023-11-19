import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks/rtk-hooks';
import { loginFail, loginSuccess } from '../../store/user/user.slice';
import { saveToken } from '../../services/token';

export const LoginModal = () => {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [newUserMode, setNewUserMode] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handlelogin = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const url = newUserMode ? '/register' : '/login';
    if (loginRef.current !== null && passwordRef.current !== null) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login : loginRef.current.value,
            password : passwordRef.current.value,
          }),
        });
        const data = await response.json() as {
          userName? : string;
          error? : string;
        };
        const token = response.headers.get('user-login-token');
        if (data.userName && token) {
          dispatch(loginSuccess(data.userName));
          saveToken(token);
        }
        if (data.error && !data.userName && !token) {
          dispatch(loginFail(data.error));
        }
      }
      catch(err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  };

  return (
    <form className="modal" onSubmit={(evt) => void handlelogin(evt)}>
      <input className="modal__input" type="text" id="login" name="login" ref={loginRef}/>
      <label className="modal__label" htmlFor="login">Логин</label>
      <input className="modal__input" type="text" id="password" name="password" ref={passwordRef}/>
      <label className="modal__label" htmlFor="password">Пароль</label>
      <input className="modal__input" type="checkbox" id="new-user" onChange={() => setNewUserMode((prevMode) => !prevMode)} checked={newUserMode}/>
      <label className="modal__label" htmlFor="new-user">Новый пользователь</label>
      <button className="modal__button" type="submit">ВОЙТИ</button>
    </form>
  );
};
