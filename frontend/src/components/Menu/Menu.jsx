import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

const Menu = ({ handler, handleToggleMenu }) => {
  const closeMenu = () => {
    handleToggleMenu(false);
  }


  return (
    <section className={`menu ${handler ? 'menu_active' : ''}`}>
      <div className={`menu__overlay ${handler ? 'menu__overlay_active' : ''}`}></div>
      <section className="menu__container">
        <button className="menu__button-close" type="button" onClick={closeMenu}></button>
        <nav className="menu__nav">
          <NavLink onClick={closeMenu}
            to="/"
            className={({ isActive }) =>
              `menu__link ${isActive ? "menu__link_active" : ""}`
            }
          >
            Главная
          </NavLink>
          <NavLink onClick={closeMenu}
            to="/movies"
            className={({ isActive }) =>
              `menu__link ${
                isActive ? "menu__link_active" : ""
              }`
            }
          >
            Фильмы
          </NavLink>
          <NavLink onClick={closeMenu}
            to="/saved-movies"
            className={({ isActive }) =>
              `menu__link ${
                isActive ? "menu__link_active" : ""
              }`
            }
          >
            Сохраненые фильмы
          </NavLink>
          <NavLink onClick={closeMenu}
            to="/profile"
            className={({ isActive }) =>
              `menu__account ${
                isActive ? "menu__account_active" : ""
              }`
            }
          >
            <p className="menu__button-account">Аккаунт</p>
            <div className="menu__account-icon"></div>
          </NavLink>
        </nav>
      </section>
    </section>
  );
};

export default Menu;
