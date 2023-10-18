import MainPage from "./pages/MainPage";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import moviesContext from "./context/MoviesContext";
import React, { useState, useEffect } from "react";
import SearchPage from "./pages/SearchPage";
import TopRatedMovies from "./pages/TopRatedMovies";
import TopRatedTv from "./pages/TopRatedTv";
import TvPage from "./pages/TvPage";
import Login from "./components/account/Login";
import AccountPage from "./pages/accPages/AccountPage";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const values = {
    showLogin,
    setShowLogin,
    user,
    setUser,
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

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
              <Route path="/account" element={<AccountPage />} />
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
