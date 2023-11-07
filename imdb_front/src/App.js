import { Routes, Route } from "react-router-dom";
import moviesContext from "./context/MainContext";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { SERVER_API } from "./utilities/APIS";
import axios from "axios";
import Login from "./components/account/Login";
import Header from "./components/Header";
import { routes, accountRoutes, rootRoute } from "./utilities/routes";

// userengament add rating logic
// implement modal for disliked movies/show
// discover page
// create episode page
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
        <Header />
        <div className="container m-5">
          <Routes>
            {(user
              ? [...accountRoutes, ...routes, rootRoute]
              : [...routes, rootRoute]
            ).map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
      </moviesContext.Provider>
    </div>
  );
}

export default App;
