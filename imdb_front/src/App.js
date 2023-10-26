import MainPage from "./pages/MainPage";
import NavBar from "./components/Navigation/NavBar";
import { Routes, Route } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import moviesContext from "./context/MoviesContext";
import React, { useState, useEffect } from "react";
import SearchPage from "./pages/SearchPage";
import TopRatedMovies from "./pages/TopRatedMovies";
import TopRatedTv from "./pages/TopRatedTv";
import TvPage from "./pages/TvPage";
import Login from "./components/account/Login";
import SettingsPage from "./pages/accPages/SettingsPage";
import LikedMoviesPage from "./pages/accPages/LikedMoviesPage";
import LikedTvShowsPage from "./pages/accPages/LikedTvShowsPage";

// add comment for liked/disliked show/movie,
// implement modal for disliked movies/show
// create page explore"explore page will show unseen tvs, filter by rating,genre ir t.t"
// implement filter for every result from tmdbapi
// at account settings implement changes for account, change picture,name,password,email
// create chatbox
// create forums
// choose language
// finish some styling with few animations
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const values = {
    showLogin,
    setShowLogin,
    user,
    setUser,
  };
  const loggedInUser = localStorage.getItem("user");
  useEffect(() => {
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, [loggedInUser]);

  return (
    <div>
      <moviesContext.Provider value={values}>
        {showLogin && <Login />}
        <NavBar />
        <div className="container m-5">
          {user ? (
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/TopMovies" element={<TopRatedMovies />} />
              <Route path="/TopShows" element={<TopRatedTv />} />

              <Route path="/movie/:movieId" element={<MoviePage />} />
              <Route path="/tv/:tvId" element={<TvPage />} />
              <Route path="/search/:title" element={<SearchPage />} />
              <Route path="/Settings" element={<SettingsPage />} />
              <Route path="/LikedMovies" element={<LikedMoviesPage />} />
              <Route path="/LikedShows" element={<LikedTvShowsPage />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/TopMovies" element={<TopRatedMovies />} />
              <Route path="/TopShows" element={<TopRatedTv />} />

              <Route path="/movie/:movieId" element={<MoviePage />} />
              <Route path="/tv/:tvId" element={<TvPage />} />
              <Route path="/search/:title" element={<SearchPage />} />
            </Routes>
          )}
        </div>
      </moviesContext.Provider>
    </div>
  );
}

export default App;
