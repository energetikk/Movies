import React from "react";
import './FilterCheckbox.css';
import { useLocation } from "react-router-dom";

const FilterCheckbox = ({checkBoxStatus, setCheckBoxStatus, toggleMoviesShort, setSubmitError, value}) => {
const location = useLocation();

const handleCheckBoxToggle = (evt) => {
  if ((!(localStorage.getItem('baseFilms')) || !value) && location.pathname === '/movies') {
    setSubmitError(true)
    return
  }
    setCheckBoxStatus(!checkBoxStatus);
    toggleMoviesShort();
}

  return (
    <div className="filter-checkbox">
      <input type="checkbox" id="myCheckbox" checked={checkBoxStatus} onChange={handleCheckBoxToggle}/>
      <label htmlFor="myCheckbox" className="checkbox-toggle"></label>
      <p className="filter-checkbox-name">Короткометражки</p>
    </div>
  )
};

export default FilterCheckbox;
