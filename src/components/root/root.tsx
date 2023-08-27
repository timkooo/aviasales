import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Root = () => (
  <React.Fragment>

    <header className="site-header">
      <div className="site-header__wrapper">
        <a className="site-header__logo" href="./index.html">
          <svg width="130" height="74">
            <use href="./img/sprite.svg#header-logo" />
          </svg>
        </a>
        <ul className="site-header__menu header-menu">
          <li className="header-menu__item">
            <Link className="header-menu__link" to="/flights">На главную</Link>
          </li>
          <li className="header-menu__item">
            <Link className="header-menu__link" to="/flights">Информация о полетах</Link>
          </li>
        </ul>
        <form className="site-header__form seach-form" action="">
          <input className="seach-form__input" type="search" placeholder="Введите номер рейса" />
        </form>
        <article className="site-header__pilot-card pilot-card">
          <h1 className="pilot-card__name">Крис Кристоферсон</h1>
          <p className="pilot-card__data">США, возраст 30 лет</p>
          <p className="pilot-card__flight-time">400000 часов</p>
        </article>
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
