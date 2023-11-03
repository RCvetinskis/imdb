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
    return `${enviroment}${type}/top_rated?language=en-US&page=1${API_KEY}`;
  },
  search(name, type, page) {
    return `${enviroment}search/${type}?query=${name}&page=${page}${API_KEY}`;
  },
  genres(type) {
    return `${enviroment}genre/${type}/list?language=en${API_KEY}`;
  },
};
const SERVER_API = {
  register: serverEnviroment + "register",
  login: serverEnviroment + "login",
  authorized: serverEnviroment + "authorized",
  logout: serverEnviroment + "logout",
  like: serverEnviroment + "like_list",
  dislike: serverEnviroment + "dislike_list",
  movies: serverEnviroment + "movies",
  tv: serverEnviroment + "tvShows",
  post_comment: serverEnviroment + "post_comment",
  post_reply_comment: serverEnviroment + "post_reply_comment",
  get_comments: serverEnviroment + "get_comments",
  get_reply_comments: serverEnviroment + "get_reply_comments",
  rate: serverEnviroment + "rate",
  add_show: serverEnviroment + "add_show",
};

export { TMDB_API, SERVER_API };
