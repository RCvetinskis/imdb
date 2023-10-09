import MainPage from "./pages/MainPage";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MoviePage from "./pages/MoviePage";
import moviesContext from "./context/MoviesContext";
import { useState } from "react";
import SearchPage from "./pages/SearchPage";
function App() {
  const [getMovies, setMovies] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  // make pagination, topmovies ,toptvshows page and create homepage with popular movies/shows via btn display modal of movies and shows
  const values = {
    getMovies,
    setMovies,
    searchResult,
    setSearchResult,
  };

  return (
    <div className="App">
      <moviesContext.Provider value={values}>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/movie/:movieId" element={<MoviePage />} />
            <Route path="/search/:title" element={<SearchPage />} />
          </Routes>
        </div>
      </moviesContext.Provider>
    </div>
  );
}

export default App;
