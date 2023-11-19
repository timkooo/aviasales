import { FC, FormEvent, useRef, useState, Dispatch } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/rtk-hooks';
import { loginFail, loginSuccess } from '../../store/user/user.slice';
import { saveToken } from '../../services/token';
import { selectError } from '../../store/user/user.selectors';
import classNames from 'classnames';

type LoginModalProps = {
  visibility: boolean;
  onChangeVisibility: Dispatch<boolean>;
}

export const LoginModal: FC<LoginModalProps> = ( {visibility = false, onChangeVisibility} ) => {
  // const [loginModalVisible, setLoginModalVisible] = useState<boolean>(visibility);
  const error = useAppSelector(selectError);
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
          setNewUserMode(false);
          handleCloseModal();
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

  const handleCloseModal = () => {
    onChangeVisibility(false);
  };

  return (
    <div className={classNames('login-modal', {'login-modal--visible': visibility})}>
      <form className="login-modal__form" onSubmit={(evt) => void handlelogin(evt)}>
        <label className="login-modal__label" htmlFor="login">Login</label>
        <input className="login-modal__input" type="text" id="login" name="login" defaultValue={'aaaaa@nail.ru'} ref={loginRef}/>
        <label className="login-modal__label" htmlFor="password">Password</label>
        <input className="login-modal__input" type="text" id="password" name="password" defaultValue={'12345'} ref={passwordRef}/>
        <div className="login-modal__item">
          <input className="login-modal__checkbox" type="checkbox" id="new-user" onChange={() => setNewUserMode((prevMode) => !prevMode)} checked={newUserMode}/>
          <label className="login-modal__label" htmlFor="new-user">New user</label>
        </div>
        <button className="login-modal__login-button" type="submit">Login</button>
        <button className="login-modal__close-button" type="button" onClick={handleCloseModal} />
        <p className="login-modal__error-message">{error}</p>
      </form>
    </div>
  );
};
