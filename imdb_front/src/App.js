import MainPage from "./pages/MainPage";
import NavBar from "./components/Navigation/NavBar";
import { Routes, Route } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import moviesContext from "./context/MainContext";
import React, { useState, useEffect } from "react";
import SearchPage from "./pages/SearchPage";
import TopRatedMovies from "./pages/TopRatedMovies";
import TopRatedTv from "./pages/TopRatedTv";
import TvPage from "./pages/TvPage";
import Login from "./components/account/Login";
import SettingsPage from "./pages/accPages/SettingsPage";
import LikedMoviesPage from "./pages/accPages/LikedMoviesPage";
import LikedTvShowsPage from "./pages/accPages/LikedTvShowsPage";
import { io } from "socket.io-client";
import { SERVER_API } from "./utilities/APIS";
import axios from "axios";
// userengament add rating logic, fix displayng shows likes length
// implement modal for disliked movies/show
// create page explore"explore page will show unseen tvs, filter by rating,genre ir t.t"
// implement filter for every result from tmdbapi
// at account settings implement changes for account, change picture,name,password,email
// create chatbox
// create forums
// choose language
// finish some styling with few animations
const socket = io.connect("http://localhost:4000");

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const values = {
    socket,
    showLogin,
    setShowLogin,
    user,
    setUser,
  };

  const initializeUser = async () => {
    try {
      const response = await axios.get(SERVER_API.authorized, {
        withCredentials: true,
      });

      if (!response.data.error) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error("Failed to initialize user:", error);
    }
  };

  useEffect(() => {
    initializeUser();
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
