import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

const MoviesCardList = ({
  movieslist,
  onMovieLike,
  saviedMovies,
  onMovieDelete,
  count,
  getMoreMovies,
}) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      {pathname === "/movies" ? (
        <section className="movies-cards-list">
          <ul className="movies__preview-list">
            {movieslist.slice(0, count).map((card) => (
              <MoviesCard
                key={card.id}
                card={card}
                movieslist={movieslist}
                onMovieLike={onMovieLike}
                saviedMovies={saviedMovies}
                onMovieDelete={onMovieDelete}
              />
            ))}
          </ul>
          {!(movieslist.length <= count) ? (
            <button
              type="button"
              className="movies__more-button"
              onClick={getMoreMovies}
            >
              Ещё
            </button>
          ) : (
            <></>
          )}
        </section>
      ) : (
        <section className="movies-cards-list">
          <ul className="movies__preview-list">
            {saviedMovies.map((card) => (
              <MoviesCard
                key={card.id}
                card={card}
                onMovieLike={onMovieLike}
                saviedMovies={saviedMovies}
                onMovieDelete={onMovieDelete}
              />
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default MoviesCardList;
