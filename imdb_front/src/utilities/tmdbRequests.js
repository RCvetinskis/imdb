import axios from "axios";

const API_KEY = "2bccfb8c7fb0ea3f83a200245e5031fc";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eeyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmNjZmI4YzdmYjBlYTNmODNhMjAwMjQ1ZTUwMzFmYyIsInN1YiI6IjYzMGZjZmJlYzA0OGE5MDA3ZDBlNmNhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z6qF806Sfp5LHjWlU7G176ldzg0aEu1I0fGbe1s2lZk",
  },
};
const axiosGetData = (api, setData) => {
  axios
    .get(api, options)
    .then((response) => {
      setData(
        response.data || {
          page: response.data.page,
          results: response.data.results,
          total_pages: response.data.total_pages,
          total_results: response.data.total_results,
        }
      );
    })
    .catch((error) => console.log(error));
};
const getPopularMovies = (setData) => {
  const API_POPULAR =
    "https://api.themoviedb.org/3/movie/popular?api_key=" + API_KEY;
  axiosGetData(API_POPULAR, setData);
};

const getMovieById = (id, setData) => {
  const API_BYID = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

  axiosGetData(API_BYID, setData);
};
const getTvById = (id, setData) => {
  const API_BYID = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`;

  axiosGetData(API_BYID, setData);
};

const searchData = (name, setData) => {
  const API_SEARCH = `https://api.themoviedb.org/3/search/multi?query=${name}&api_key=${API_KEY}`;
  axiosGetData(API_SEARCH, setData);
};

const getTopMovies = (page, setData) => {
  const API_TOP_MOVIES = ` https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}&api_key=${API_KEY}`;
  axiosGetData(API_TOP_MOVIES, setData);
};
const getTopTV = (page, setData) => {
  const API_TOP_MOVIES = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}&api_key=${API_KEY}`;
  axiosGetData(API_TOP_MOVIES, setData);
};
export {
  getMovieById,
  getPopularMovies,
  searchData,
  getTopMovies,
  getTopTV,
  getTvById,
};
