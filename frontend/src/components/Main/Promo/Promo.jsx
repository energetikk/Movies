import React from "react";
import './Promo.css';
import logo from "../../../images/pic__COLOR_landing-logo.svg";

const AboutProject = () => {
  return (
    <div className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img className="promo__logo" src={logo} alt="Логотип учебного проекта"/>
    </div>
  )
};

export default AboutProject;