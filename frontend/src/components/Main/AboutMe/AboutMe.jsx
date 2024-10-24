import React from "react";
import "./AboutMe.css";
import myAvatar from "../../../images/my_avatar.png";

const AboutMe = (props) => {
  return (
    <section className="aboutme" id="about-me">
      <h2 className="aboutme__title">Студент</h2>
      <div className="aboutme__container">
        <article className="aboutme__bio">
          <h3 className="aboutme__name">Павел</h3>
          <h4 className="aboutme__job">Фронтенд-разработчик, 34 года</h4>
          <p className="aboutme__info">
            Я живу в Нижнем Новгороде, закончил институт ядерной энергетики и
            технической физики. У меня есть жена и сын. Я люблю слушать музыку,
            а ещё увлекаюсь современными технологиями. Недавно начал кодить.
            После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            href="https://github.com/energetikk"
            target='_blank'
            className="aboutme__link-github"
          >
            Github
          </a>
        </article>
        <img
          src={myAvatar}
          alt="Фотография профиля"
          className="aboutme__photo"
        />
      </div>
    </section>
  );
};

export default AboutMe;
