import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";
import useInput from "../../hooks/useForm";
import { useEffect } from "react";

const SearchForm = ({
  handleMoviesSearchSubmit,
  setValue,
  value,
  getSaviedMovies,
  checkBoxStatus,
  setCheckBoxStatus,
  errorSearchMovies,
  toggleMoviesShort,
  submitError,
  setSubmitError,
  valueSave,
  errorSearchSaveMovies
}) => {

  const location = useLocation();
  const { pathname } = location;

  const namemovie = useInput("", {isEmpty: true });

  useEffect(() => {
    namemovie.setFormValue(value);
  }, [value])

  useEffect(() => {
    setSubmitError(false);
  }, [value, valueSave])

  function handleSearchInput(evt) {
    setValue(evt.target.value);
  }

  function searchMoviesSubmit(evt) {
    evt.preventDefault();
    if (!value) {
      if (pathname === "/movies") {
        setSubmitError(true);
        localStorage.setItem("requestKey", "");
        localStorage.setItem("findedMovies", []);
        localStorage.setItem("findedMoviesShort", []);
        return;
      } else if(valueSave) {
        console.log('test')
        getSaviedMovies();
      }
    } else {
      handleMoviesSearchSubmit(value);
      setSubmitError(false);
    }
  }

  return (
    <section className="search-form__container">
      <form className="search-form" onSubmit={searchMoviesSubmit}>
        <input
          type="text"
          className="search-form__input"
          placeholder="Фильм"
          value={value}
          onChange={handleSearchInput}
          onBlur={(evt) => namemovie.onBlur(evt)}
        />
        <button
          disabled={submitError}
          type="submit"
          className={`${!submitError && 'search-form__submit_disabled'} search-form__submit`}>
        </button>
        <span className={`${submitError ? 'search-form__empty' : 'search-form__empty_hide'}`}>
              Нужно ввести ключевое слово...
        </span>
      </form>
      <span className="search-form__line"></span>
      <FilterCheckbox
        className="filter-checkbox"
        checkBoxStatus={checkBoxStatus}
        setCheckBoxStatus={setCheckBoxStatus}
        toggleMoviesShort={toggleMoviesShort}
        submitError={submitError}
        setSubmitError={setSubmitError}
        value={value}
      />
      {!errorSearchMovies ? <></> : (<p className="search-form__error">Ничего не найдено...</p>)}
      {!errorSearchSaveMovies ? <></> : (<p className="search-form__error">Ничего не найдено...</p>)}
    </section>
  );
};

export default SearchForm;
