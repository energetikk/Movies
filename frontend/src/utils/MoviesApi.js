const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies/";

//Проверка ответа от сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Произошла ошибка: ${res.status}`); // если ошибка, отклоняем промис
}

//Запросить информацию о пользователе с сервера
const getMovies = () => {
  return fetch(`${BASE_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponse(res));
};

export {getMovies};