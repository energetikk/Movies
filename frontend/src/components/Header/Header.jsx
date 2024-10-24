import React from "react";
import logo from "../../images/logo_header.svg";
import { Link, NavLink, useLocation } from "react-router-dom";


function Header({ loggedIn, handleToggleMenu }) {


  const location = useLocation();
  const { pathname } = location;

  const backgroundHeader = loggedIn && pathname !== '/' ? 'header__background_dark' : '';

  const isActive = true;

  return (
    <header className="auth-container">
      <div className={`header ${backgroundHeader}`}>
        <Link to="/">
          <img
            src={logo}
            alt="Логотип соцсети Mesto"
            className="header__logo"
          />
        </Link>
        {loggedIn ? (
          <nav className="header__movies">
            <NavLink to="/movies" className={({isActive}) => `header__films header__nav-hidden ${isActive ? "header__films_active" : ""}`}>Фильмы</NavLink>
            <NavLink to="/saved-movies" className={({isActive}) => `header__savied-films header__nav-hidden ${isActive ? "header__savied-films_active" : ""}`}>Сохраненые фильмы</NavLink>
            <NavLink to="/profile" className={({isActive}) => `header__account header__nav-hidden ${isActive ? "header__account_active" : ""}`}>
              <p className="header__button-account">Аккаунт</p>
              <div className="header__account-icon"></div>
            </NavLink>
            <button className="burger" type="button" onClick={handleToggleMenu}>
              <span className="burger__icon"></span>
            </button>
          </nav>
        ) : (
          <div className="auth">
            <Link className="header__button-signup" to="/signup">
              Регистрация
            </Link>
            <Link className="header__button-signin" to="/signin">
              Войти
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
