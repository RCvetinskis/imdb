const enviroment = "https://api.themoviedb.org/3";
const API_KEY = "api_key=2bccfb8c7fb0ea3f83a200245e5031fc";
const serverEnviroment = "http://localhost:4000/";

const TMDB_API = {
  popular(type) {
    return `${enviroment}/${type}/popular?language=en-US?&${API_KEY}`;
  },
  trending(type) {
    return `${enviroment}/trending/${type}/day?language=en-US?&${API_KEY}`;
  },
  now_playing: `${enviroment}/movie/now_playing?language=en-US?&${API_KEY}`,
  upcoming: `${enviroment}/movie/upcoming?language=en-US?&${API_KEY}`,
  airing_today: `${enviroment}/tv/airing_today?language=en-US?&${API_KEY}`,
  on_the_air: `${enviroment}/tv/on_the_air?language=en-US?&${API_KEY}`,
  by_id(type, id) {
    return `${enviroment}/${type}/${id}?&${API_KEY}`;
  },
  top(type, page) {
    return `${enviroment}/${type}/top_rated?language=en-US&page=${page}&${API_KEY}`;
  },
  search(name, type, page) {
    return `${enviroment}/search/${type}?query=${name}&page=${page}&${API_KEY}`;
  },
  genres(type) {
    return `${enviroment}/genre/${type}/list?language=en&${API_KEY}`;
  },
  videos(type, id) {
    return `${enviroment}/${type}/${id}/videos?&${API_KEY}`;
  },
  discover(pathname) {
    return `${enviroment}${pathname}&${API_KEY}`;
  },
  languageCodes: `${enviroment}/configuration/languages?&${API_KEY}`,
  season(pathname) {
    return `${enviroment}${pathname}&${API_KEY}`;
  },
};
const SERVER_API = {
  // User Authentication
  register: serverEnviroment + "register",
  login: serverEnviroment + "login",
  authorized: serverEnviroment + "authorized",
  logout: serverEnviroment + "logout",
  update_user: serverEnviroment + "update_user",

  // User Show Interaction
  handle_show_like: serverEnviroment + "handle_show_like",
  handle_show_dislike: serverEnviroment + "handle_show_dislike",
  handle_show_seen: serverEnviroment + "handle_show_seen",

  // User Engagement (Comments and Replies)
  post_comment: serverEnviroment + "post_comment",
  post_reply_comment: serverEnviroment + "post_reply_comment",
  get_comments: serverEnviroment + "get_comments",
  get_reply_comments: serverEnviroment + "get_reply_comments",

  // shows
  add_show: serverEnviroment + "add_show",
  show_like_length: serverEnviroment + "show_like_length",
  user_shows_list(search) {
    return `${serverEnviroment}user_shows_list${search}`;
  },
  //  users shows genres/languages
  user_shows_genres_list: serverEnviroment + "user_shows_genres_list",
  user_shows_language_list: serverEnviroment + "user_shows_language_list",

  // Ratings
  rate: serverEnviroment + "rate",
};

export { TMDB_API, SERVER_API };
