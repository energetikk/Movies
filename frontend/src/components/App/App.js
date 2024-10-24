import React from "react";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedMovies from "../SavedMovies/SavedMovies";
import Movies from "../Movies/Movies";
import { useLocation } from "react-router-dom";
import Menu from "../Menu/Menu";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as MainApi from "../../utils/MainApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isStatusLoginError, setIsStatusLoginError] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [updateProfileSuccess, setUpdateProfileSuccess] = useState(false);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState(false);

  // Доступ к свойствам объекта location
  const location = useLocation();
  const { pathname } = location;
  const { search } = location;

  function handleCheckStatusLoginError() {
    setIsStatusLoginError(true);
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      MainApi.getContent(jwt)
        .then((user) => {
          handleLogin(user);
          navigate(`${pathname}${search}`, { replace: true });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleLogin = (user) => {
    setLoggedIn(true);
    setEmailUser(user.email);
    setNameUser(user.name);
  };

  function handleCheckRegister(name, password, email) {
    MainApi.register({ name, password, email })
      .then((res) => {
        handleCheckLogin(password, email);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        handleCheckStatusLoginError(err);
        console.log(`ошибка ${err}`);
      });
  }

  function handleCheckLogin(password, email) {
    setIsLoading(true);
    MainApi.authorize({ password, email })
      .then((res) => {
        setIsLoading(false);
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          handleLogin({ password, email });
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        handleCheckStatusLoginError();
        console.log(`ошибка ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function singOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("requestKey");
    localStorage.removeItem("baseFilms");
    localStorage.removeItem("checkBoxStatus");
    localStorage.removeItem("findedMovies");
    localStorage.removeItem("findedMoviesShort");
    setLoggedIn(false);
    navigate("/");
  }

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  const [ErrorPage, setErrorPage] = useState(false);
  const [closeMenu, setCloseMenu] = useState(false);

  const handleToggleMenu = () => {
    setCloseMenu(!closeMenu);
  };

  useEffect(() => {
    if (loggedIn) {
      MainApi.getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleUpdateUser(value) {
    MainApi.setUserInfo(value)
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        setUpdateProfileSuccess(true);
        setTimeout(() => {
          setUpdateProfileSuccess(false);
        }, 3000)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {

      });
  }

  // Добавление фильмов в сохраненные и удаление из сохранненых
  const [saviedMovies, setSaviedMovies] = useState([]);

  // useEffect(() => {
  //   if (loggedIn) {
  //   MainApi.getSavedMovies()
  //     .then((data) => {
  //       setSaviedMovies(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   }
  // }, [currentUser]);

function getSaviedMovies() {
  // setSubmitError(false);
  if (loggedIn) {
      MainApi.getSavedMovies()
        .then((data) => {
          setSaviedMovies(data);
        })
        .catch((err) => {
          console.log(err);
        });
      }
}

useEffect(() => {
  getSaviedMovies()
}, [currentUser])

  const handleMovieLike = (card) => {
    const isLiked = saviedMovies.some((i) => i.movieId === card.movieId);
    console.log(isLiked);

    if (!isLiked) {
      MainApi.setLikeMovie(card)
        .then((newCard) => {
          setSaviedMovies([...saviedMovies, newCard]);
        })
        .catch((err) => console.log(err));
    } else {
      // Найдем айдишник карточки  на которую мы кликнули
      const id = saviedMovies.find((i) => i.movieId === card.movieId)._id;
      MainApi.deleteMovie(id)
        .then(() => {
          setSaviedMovies(saviedMovies.filter((i) => i._id !== id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleMovieCardDelete = (card) => {
    MainApi.deleteMovie(card._id)
      .then(() => {
        setSaviedMovies((moviesCards) =>
          moviesCards.filter((i) => i._id !== card._id)
        );
      })
      .catch((err) => console.log(err));
  };

  // const [rawMovies, setRawMovies] = useState(JSON.parse(localStorage.getItem('baseFilms')) || []);
  const [keysWords, setKeysWords] = useState(
    localStorage.getItem("keysWords") || "");
  const [keysWordsSaviedSearch, setKeysWordsSaviedSearch] = useState(
    localStorage.getItem("keysWordsSaviedSearch") || ""
  );
  const [checkBoxStatus, setCheckBoxStatus] = useState(
    JSON.parse(localStorage.getItem("checkBoxStatus"))
  );

  return (
    <div className="app__center">
      <CurrentUserContext.Provider value={currentUser}>
        {pathname !== "/signin" && pathname !== "/signup" && !ErrorPage && (
          <Header loggedIn={loggedIn} handleToggleMenu={handleToggleMenu} />
        )}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                onMovieLike={handleMovieLike}
                saviedMovies={saviedMovies}
                keysWords={keysWords}
                setKeysWords={setKeysWords}
                checkBoxStatus={checkBoxStatus}
                setCheckBoxStatus={setCheckBoxStatus}
                submitError={submitError}
                setSubmitError={setSubmitError}
                // value={value}
                // setValue={setValue}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                onMovieDelete={handleMovieCardDelete}
                saviedMovies={saviedMovies}
                keysWords={keysWords} setKeysWords={setKeysWords} checkBoxStatus={checkBoxStatus} setCheckBoxStatus={setCheckBoxStatus}
                keysWordsSaviedSearch={keysWordsSaviedSearch}
                setKeysWordsSaviedSearch={setKeysWordsSaviedSearch}
                submitError={submitError}
                 setSubmitError={setSubmitError}
                 getSaviedMovies={getSaviedMovies}
                //  value={value}
                //  setValue={setValue}

              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                singOut={singOut}
                nameUser={nameUser}
                emailUser={emailUser}
                onUpdateUser={handleUpdateUser}
                updateProfileSuccess={updateProfileSuccess}
              />
            }
          />
          <Route
            path="/signin"
            element={loggedIn ? <Navigate to="/" /> : <Login handleCheckLogin={handleCheckLogin} />}
          />
          <Route
            path="/signup"
            element={loggedIn ? <Navigate to="/" /> : <Register handleCheckRegister={handleCheckRegister} />}
          />

          <Route
            path="*"
            element={<PageNotFound setErrorPage={setErrorPage} />}
          />
        </Routes>
        {(pathname === "/" ||
          pathname === "/movies" ||
          pathname === "/saved-movies") && <Footer />}
        <Menu handler={closeMenu} handleToggleMenu={handleToggleMenu} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
