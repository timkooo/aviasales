import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routesConfig } from '../../routes-config';
import { initMirage } from '../../mirage/mirage';
import { dropToken, getToken } from '../../services/token';
import { useAppDispatch } from '../../hooks/rtk-hooks';
import { loginFail, loginSuccess } from '../../store/user/user.slice';
import { useEffect } from 'react';

initMirage();

export const router = createBrowserRouter(routesConfig);

export const App = () => {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    try {
      const response = await fetch('/login', {
        headers: {
          'user-login-token' : getToken(),
        },
      });
      const data = await response.json() as {
        userName? : string;
        error? : string;
      };
      if (data.userName && !data.error) {
        dispatch(loginSuccess(data.userName));
      }
      if (data.error && !data.userName) {
        dispatch(loginFail(data.error));
        dropToken();
      }
    }
    catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    checkAuth();
  });

  return <RouterProvider router={ router }/>;
};
