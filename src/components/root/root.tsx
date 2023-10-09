import React from 'react';
import { Outlet } from 'react-router-dom';
import { BooksControls } from '../controls/books-controls';

export const Root = () => (
  <React.Fragment>

    <header className="site-header">
      <div className="site-header__wrapper">
        <BooksControls />
      </div>
    </header>

    <main className="site-main">

      <Outlet />

    </main>

    <footer className="site-footer">
      <a className="site-footer__social-mail" href="mailto:bfg20k@mail.ru">timkoo64</a>
    </footer>

  </React.Fragment>
);
