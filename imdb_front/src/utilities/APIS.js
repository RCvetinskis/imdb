const API_KEY = "&api_key=2bccfb8c7fb0ea3f83a200245e5031fc";

const TMDB_API = {
  popular(type) {
    return `https://api.themoviedb.org/3/${type}/popular?language=en-US?${API_KEY}`;
  },
  by_id(type, id) {
    return `https://api.themoviedb.org/3/${type}/${id}?${API_KEY}`;
  },
  top(type, page) {
    return `https://api.themoviedb.org/3/${type}/top_rated?language=en-US&page=${page}${API_KEY}`;
  },
  search(name, type, page) {
    return `https://api.themoviedb.org/3/search/${type}?query=${name}&page=${page}${API_KEY}`;
  },
};

export default TMDB_API;
