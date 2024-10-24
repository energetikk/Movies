import React from "react";
import "./MoviesCard.css";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as MainApi from "../../utils/MainApi"
import { useState } from "react";

const MoviesCard = ({card, onMovieLike, onMovieDelete, saviedMovies}) => {
  const currentUser = useContext(CurrentUserContext);



  const location = useLocation();
  const {pathname} = location;

  const moviesPage = pathname === '/movies'

  const value = card.duration;
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  const isLiked = saviedMovies.some(i => i.movieId === card.id)

  function handleLikeClick() {
    const newCard = {
      movieId: card.id,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: `https://api.nomoreparties.co${card.image.url}`,
      trailerLink: card.trailerLink,
      thumbnail: card.image.formats.thumbnail.url,
    }
    onMovieLike(newCard);
  }

  function handleUnLikeClick() {
    onMovieDelete(card);
  }

  return (
    <li className="movie">
      <figure className="movies__element">
        <Link to={card.trailerLink} target="_blank"><img className="movies-card-image" src={!moviesPage ? card.image : `https://api.nomoreparties.co/${card.image.url}`} alt={`Картинка превью фильма: ${card.nameRU}`} /></Link>
        <figcaption className="movies__card">
          <p className="movies__card-name">{card.nameRU}</p>
          { moviesPage ?
          (<button type="button" className={`${isLiked ? 'movies__button-like_active' : '' } movies__button-like`} onClick={handleLikeClick}></button>) :
          (<button type="button" className="movies__button-delete" onClick={handleUnLikeClick}></button>)
          }
        </figcaption>
        <p className="movie__duration">{`${hours}ч ${minutes}м`}</p>
      </figure>
    </li>
  );
};

export default MoviesCard;
