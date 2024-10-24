import React from "react"
import { useState, useContext, useEffect } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useInput from "../../hooks/useForm";

const Profile = ({ singOut, nameUser, emailUser, onUpdateUser, loggedIn, updateProfileSuccess }) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(nameUser);
  const [email, setEmail] = useState(emailUser);
  //Для отображения страницы с непройденной валидацией необходимо ниже вручную поменять стейт переменной validationProfile
  // const [validationProfile, setValidationProfile] = useState(false);
  const navigate = useNavigate();
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const currentUser = useContext(CurrentUserContext);


  const nameuser = useInput(`${currentUser.name}`, {isEmpty: true, minLength: 2, maxLength: 40 });
  const emailuser = useInput(`${currentUser.email}`, { isEmpty: true, emailRegEx: true});

  function editProfile() {
    setNameInput(name);
    setEmailInput(email);
    setEditMode(true);
  }

  function handleChangeName(evt) {
    console.log(evt.target.value);
    setNameInput(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmailInput(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    setName(nameInput);
    setEmail(emailInput);
    onUpdateUser({ name: nameuser.formValue, email: emailuser.formValue });
    setEditMode(false);
  }

  useEffect(() => {
    setNameInput({name: currentUser.name});
    setEmailInput({email: currentUser.email});
  }, [currentUser, loggedIn]);

  return (

    <section className="profile__container">
          <h2 className="profile__title">Привет, {currentUser.name === undefined ? nameUser : currentUser.name}!</h2>
     { !editMode ?
          (<>
          <div className="profile__info">
            <p className="profile__parameter">Имя</p>
            <p className="profile__value">{currentUser.name === undefined ? nameUser : currentUser.name}</p>
          </div>
          <div className="profile__info">
            <p className="profile__parameter">E-mail</p>
            <p className="profile__value">{currentUser.email === undefined ? emailUser : currentUser.email}</p>
          </div>
          <p className={`${updateProfileSuccess ? 'profile__sucsess-update-message' : 'profile__sucsess-update-message_hidden'}`}>Данные успешно обновлены!</p>
          <button type="button" className="button__edit" onClick={editProfile}>Редактировать</button>
          <button type="button" className="button__logout" onClick={singOut}>Выйти из аккаунта</button></>) :
          (<>
            <form className="profile__info-edit">
              <label className="profile__parameter">Имя</label>
              <input type="text" className="profile__value-edit" value={nameuser.formValue} onChange={(evt) => nameuser.handleChangeInput(evt)} onBlur={(evt) => nameuser.onBlur(evt)}/>
            </form>
            <form className="profile__info-edit">
              <label className="profile__parameter">E-mail</label>
              <input className="profile__value-edit" value={emailuser.formValue} onChange={(evt) => emailuser.handleChangeInput(evt)} onBlur={(evt) => nameuser.onBlur(evt)} />
            </form>
          <form onSubmit={handleSubmit} className="form-button__profile">
              {nameuser.isDirty && nameuser.isEmpty && (
                <span className="profile__error">При обновлении профиля произошла ошибка.</span>)}

          <button type="submit" disabled={!nameuser.inputValid || !emailuser.inputValid || (currentUser.email === emailuser.formValue && currentUser.name === nameuser.formValue)} className={`${(!nameuser.inputValid || !emailuser.inputValid || (currentUser.email === emailuser.formValue && currentUser.name === nameuser.formValue)) && 'button__save-profile_error'} button__save-profile`}>Сохранить</button>
          </form>
          </>)}
        </section>
  )
};

export default Profile;
