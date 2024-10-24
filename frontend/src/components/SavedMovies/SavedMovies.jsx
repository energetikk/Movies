import React from "react";
import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from "react";

const SavedMovies = ({
  saviedMovies,
  onMovieDelete,
  setKeysWords,
  keysWords,
  checkBoxStatus,
  setCheckBoxStatus,
  keysWordsSaviedSearch,
  setKeysWordsSaviedSearch,
  setSubmitError,
  submitError,
  getSaviedMovies,
  value,
  setValue
}) => {

  const [filteredMovies, setFilteredMovies] = useState(saviedMovies);
  const [valueSave, setValueSave] = useState('');
  const [checkBoxStatusSave, setCheckBoxStatusSave] = useState(false);
  const [errorSearchSaveMovies, setErrorSearchSaveMovies] = useState(false);

  function filterMovies(movies, value, checkBoxStatus) {
    return  movies.filter((movie) => !checkBoxStatus ?
    (movie.nameRU.toLowerCase().includes(value.toLowerCase()) || movie.nameEN.toLowerCase().includes(value.toLowerCase()))
    :
    (movie.nameEN.toLowerCase().includes(value.toLowerCase()) || movie.nameRU.toLowerCase().includes(value.toLowerCase())) && movie.duration <= 40);
  }

  function handleMoviesSearchSubmit(valueSave) {
    if (valueSave) {
      setSubmitError(false);
    }
    setValueSave(valueSave);
  }

  function toggleMoviesShort() {
    setCheckBoxStatus(!checkBoxStatus);
  }

  useEffect(() => {
    const moviesList = filterMovies(saviedMovies, valueSave, checkBoxStatusSave);
    setFilteredMovies(moviesList);
  }, [saviedMovies, valueSave, checkBoxStatusSave]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setErrorSearchSaveMovies(true);
    } else {
      setErrorSearchSaveMovies(false);
    }
  }, [filteredMovies]);

  return (
    <main className="saved-movies__container">
      <SearchForm
        keysWords={keysWords}
        setKeysWords={setKeysWords}
        checkBoxStatus={checkBoxStatusSave}
        setCheckBoxStatus={setCheckBoxStatusSave}
        keysWordsSaviedSearch={keysWordsSaviedSearch}
        setKeysWordsSaviedSearch={setKeysWordsSaviedSearch}
        handleMoviesSearchSubmit={handleMoviesSearchSubmit}
        setValue={setValueSave}
        valueSave={valueSave}
        setSubmitError={setSubmitError}
        submitError={submitError}
        toggleMoviesShort={toggleMoviesShort}
        getSaviedMovies={getSaviedMovies}
        errorSearchSaveMovies={errorSearchSaveMovies}
      />
      <MoviesCardList
        saviedMovies={filteredMovies}
        onMovieDelete={onMovieDelete}
      />
    </main>
  );
};

export default SavedMovies;
