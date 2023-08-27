import { Navigate } from 'react-router-dom';
import { GlobalHistory } from './components/global-history/global-history';
import { Root } from './components/root/root';
import { AppRoutes } from './const';
import { Flights } from './pages/flights/flights';
// import { ErrorPage } from './pages/error-page/error-page';
// import { PageNotFound } from './pages/page-not-found/page-not-found';
// import { Flight } from '../pages/flight/flight';

export const routesConfig = [
  {
    path: AppRoutes.Main,
    element: <Root />,
    children: [
      {
        element: <GlobalHistory />,
      },
      {
        path: AppRoutes.Main,
        element: <Navigate to={AppRoutes.Flights} />,
      },
      {
        index: true,
        path: AppRoutes.Flights,
        element: <Flights />,
      },
      {
        path: `${AppRoutes.Flights}/page/:pageNumber`,
        element: <Flights />,
      },
      // {
      //   path: `${AppRoutes.Flights}/:id`,
      //   element: <Flight />,
      // },
      // {
      //   path: '*',
      //   element: <PageNotFound />,
      // },
      // {
      //   path: AppRoutes.ErrorPage,
      //   element: <ErrorPage />,
      // },
    ],
  },
];
