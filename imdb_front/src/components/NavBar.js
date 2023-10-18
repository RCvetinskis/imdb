import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";
import SearchBar from "./SearchBar";
import mainContext from "../context/MoviesContext";

const NavBar = () => {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const { user, setUser, setShowLogin } = useContext(mainContext);

  const defaultOptions = [
    {
      option: "Home",
      path: "/",
      herf: "#",
      id: Math.random() * 100,
      className: "fa-solid fa-house",
    },
    {
      option: "Top Movies",
      path: "/TopMovies",
      herf: "#",
      id: Math.random() * 100,
      className: "fa-solid fa-film",
    },
    {
      option: "Top Shows",
      path: "/TopShows",
      herf: "#",
      id: Math.random() * 100,
      className: "fa-solid fa-tv",
    },
    {
      option: user ? "Logout" : "Login",
      herf: "#",
      id: Math.random() * 100,
      className: "fa-solid fa-right-to-bracket",
    },
  ];

  const changePage = (item) => {
    if (item.option === "Login") {
      setShowLogin(true);
      navigate(!item.path);
    } else if (item.option === "Logout") {
      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
    } else {
      navigate(item.path);
    }

    setBurgerIsOpen(false);
  };

  return (
    <>
      <ul className="flex justify-between p-5 nav">
        {/* nav menu on desktop */}
        {defaultOptions.map((item) => (
          <li
            onClick={() => changePage(item)}
            className={`${
              currentLocation.pathname === item.path
                ? "nav-selected nav-li"
                : "nav-li"
            } `}
            key={item.id}
          >
            <i className={`${item.className} p-2 `}></i>
            {item.option}
          </li>
        ))}
        <SearchBar />
      </ul>

      <Hamburger
        rounded
        direction="right"
        color="#3c6e71"
        toggled={burgerIsOpen}
        toggle={setBurgerIsOpen}
      />

      {/* burger menu on mobile */}
      {burgerIsOpen && (
        <ul className="nav-mobile flex flex-col  items-center justify-evenly">
          {defaultOptions.map((item) => (
            <li
              onClick={() => changePage(item)}
              className={`${
                currentLocation.pathname === item.path
                  ? "nav-selected nav-li"
                  : "nav-li"
              } `}
              key={item.id}
            >
              <i className={`${item.className} p-2 `}></i>
              {item.option}
            </li>
          ))}
          <SearchBar />
        </ul>
      )}
    </>
  );
};

export default NavBar;
