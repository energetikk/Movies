import React from "react";
import { Link } from "react-router-dom";
import './Portfolio.css';
import link from '../../../images/link_pic.svg';

const Portfolio = (props) => {
  return (
   <section className="portfolio__container">
     <h3 className="portfolio__tiitle">Портфолио</h3>
     <ul className="portfolio__list">
      <li className="portfolio__list-item">
        <Link to="https://howtolearn.deminpavel.ru/" target='_blank' className="portfolio__link"><p className="portfolio__item-name">Статичный сайт</p><img src={link} alt="символ стрелки" className="portfolio__link-pic"/></Link>
      </li>
      <li className="portfolio__list-item">
        <Link to="https://russiantravel.deminpavel.ru/" target='_blank' className="portfolio__link"><p className="portfolio__item-name">Адаптивный сайт</p><img src={link} alt="символ стрелки" className="portfolio__link-pic"/></Link>
      </li>
      <li className="portfolio__list-item">
        <Link to="https://mesto.deminpavel.ru/" target='_blank' className="portfolio__link"><p className="portfolio__item-name">Одностраничное приложение</p><img src={link} alt="символ стрелки" className="portfolio__link-pic"/></Link>
      </li>
     </ul>
   </section>
  )
};

export default Portfolio;
