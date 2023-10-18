const enviroment = "https://api.themoviedb.org/3/";
const API_KEY = "&api_key=2bccfb8c7fb0ea3f83a200245e5031fc";
const serverEnviroment = "http://localhost:4000/";

const TMDB_API = {
  popular(type) {
    return `${enviroment}${type}/popular?language=en-US?${API_KEY}`;
  },
  by_id(type, id) {
    return `${enviroment}${type}/${id}?${API_KEY}`;
  },
  top(type, page) {
    return `${enviroment}${type}/top_rated?language=en-US&page=${page}${API_KEY}`;
  },
  search(name, type, page) {
    return `${enviroment}search/${type}?query=${name}&page=${page}${API_KEY}`;
  },
};
const SERVER_API = {
  register: serverEnviroment + "register",
  login: serverEnviroment + "login",
};

export { TMDB_API, SERVER_API };
