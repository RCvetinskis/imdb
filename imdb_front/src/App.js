import { Routes, Route } from "react-router-dom";
import moviesContext from "./context/MainContext";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { SERVER_API } from "./utilities/APIS";
import axios from "axios";
import Login from "./components/account/Login";
import Header from "./components/Header";
import { routes, accountRoutes, rootRoute } from "./utilities/routes";
import LoadingScreen from "./components/loading/LoadingScreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// add rating and displayer total rating and your rating with stars, on hover show your rating
// implement modal for disliked movies/show
// create episode page
// at account settings implement changes for account, change picture,name,password,email
// choose language
// create better comment section
// finish some styling with few animations
// for comment replys length send it from replyComments api so on socket user will see updated length
const socket = io.connect("http://localhost:4000");
function App() {
  const [openLogin, setOpenLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(false);

  const values = {
    socket,
    openLogin,
    setOpenLogin,
    user,
    setUser,
    toast,
    loadingData,
    setLoadingData,
  };
  const initializeUser = async () => {
    try {
      const { data } = await axios.get(SERVER_API.authorized, {
        withCredentials: true,
      });

      if (!data.error) {
        setUser(data.data);
      } else {
        console.log("no user seasion is found");
      }
    } catch (error) {
      console.error("Failed to initialize user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeUser();
  }, []);

  return (
    <div>
      <moviesContext.Provider value={values}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {openLogin && <Login />}
            <ToastContainer />
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
          </>
        )}
      </moviesContext.Provider>
    </div>
  );
}

export default App;
