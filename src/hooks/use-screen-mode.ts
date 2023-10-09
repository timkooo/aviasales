import { useEffect, useLayoutEffect } from 'react';
import { ScreenMode } from '../const';
import { useAppDispatch } from './rtk-hooks';
import { updateScreenMode } from '../store/application/application.slice';
import { removeAllFlights } from '../store/flights/flights.slice';
import { useNavigate } from 'react-router-dom';
import { useUrlParams } from './use-url-params';

const queries: Record<string, string> = {
  '(min-width: 320px) and (max-width: 1149px)' : ScreenMode.Mobile,
  '(min-width: 1150px)': ScreenMode.Desktop
};

export const useScreenMode = (updateUrlPageParam?: (page: number) => void) => {
  const dispatch = useAppDispatch();
  const mediaQueryLists = Object.keys(queries).map((querie) => matchMedia(querie));
  const navigate = useNavigate();
  const [, , , getParamsWethoutPage] = useUrlParams();

  useEffect(() => {
    const onScreenSizeChange = (ev: MediaQueryListEvent) => {
      if (ev.matches) {
        dispatch(removeAllFlights());
        dispatch(updateScreenMode(queries[ev.media]));
        navigate(`/flights?page=1${getParamsWethoutPage().toString()}`);
      }
    };
    mediaQueryLists.forEach((mql) => mql.addEventListener('change', onScreenSizeChange));
    return () => mediaQueryLists.forEach((mql) => mql.removeEventListener('change', onScreenSizeChange));
  }, [dispatch, mediaQueryLists, updateUrlPageParam]);

  useLayoutEffect(() => {
    mediaQueryLists.forEach((mql) => {
      if (mql.matches) {
        dispatch(updateScreenMode(queries[mql.media]));
      }
    });
  }, []);
};
