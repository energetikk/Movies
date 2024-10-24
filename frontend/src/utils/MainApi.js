// export const BASE_URL = "http://localhost:4000/";
export const BASE_URL = "/api/";
// export const BASE_URL = 'https://api.deminpavel.ru/';

//Проверка ответа от сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Произошла ошибка: ${res.status}`); // если ошибка, отклоняем промис
}

export const register = ({ name, password, email }) => {
  return fetch(`${BASE_URL}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, password, email }),
  }).then((res) => checkResponse(res));
};

export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ password, email }),
  }).then((res) => checkResponse(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })
    .then((res) => checkResponse(res))
    .then((data) => data);
};

//Запросить информацию о пользователе с сервера
export const getUserInfo = () => {
  return fetch(`${BASE_URL}users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => checkResponse(res));
};

//Записать обновленную информацию о пользователе на сервер
export const setUserInfo = ({ name, email }) => {
  return fetch(`${BASE_URL}users/me/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    credentials: "include",
    body: JSON.stringify({
      name,
      email,
    }),
  }).then((res) => checkResponse(res));
};

//Отправка запроса на добавление фильма в избранное
export const setLikeMovie = (data) => {
  return fetch(`${BASE_URL}movies/`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    credentials: "include",
    body: JSON.stringify(data)
  })
  .then((res) => checkResponse(res));
}

//Запрос на удаление карточки с сервера
export const deleteMovie = (movieId) => {
  return fetch(`${BASE_URL}movies/${movieId}`, {
  method: 'DELETE',
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
  })
  .then((res) => checkResponse(res));
}

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}movies/`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
  .then((res) => checkResponse(res));
}
