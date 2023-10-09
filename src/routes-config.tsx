import { Navigate } from 'react-router-dom';
import { GlobalHistory } from './components/global-history/global-history';
import { Root } from './components/root/root';
import { AppRoutes } from './const';
import { Flights } from './pages/flights/flights';
import { Flight } from './pages/flight/flight';
import { Books } from './pages/books/books';
import { BookPage } from './pages/book-page/book-page';

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
        element: <Navigate to={AppRoutes.Books} />,
      },
      {
        index: true,
        path: AppRoutes.Flights,
        element: <Flights />,
      },
      {
        path: `${AppRoutes.Flight}/:id`,
        element: <Flight />,
      },
      {
        index: true,
        path: AppRoutes.Books,
        element: <Books />,
      },
      {
        index: true,
        path: `${AppRoutes.Book}/:id`,
        element: <BookPage />,
      },
    ],
  },
];
