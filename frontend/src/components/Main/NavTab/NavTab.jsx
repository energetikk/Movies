import React from "react";
import './NavTab.css';
// import { Link } from 'react-router-dom';
import { Link } from 'react-scroll';

const NavTab = () => {
  return (
    <div>
      <nav className="navtab">
        <Link to="about-project" smooth={true} duration={500} className="navtab__link">О проекте</Link>
        <Link to="techs" smooth={true} duration={500} className="navtab__link">Технологии</Link>
        <Link to="about-me" smooth={true} duration={500} className="navtab__link">Студент</Link>
      </nav>
    </div>
  )
};

export default NavTab;
