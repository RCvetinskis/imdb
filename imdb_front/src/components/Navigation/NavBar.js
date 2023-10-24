import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";
import mainContext from "../../context/MoviesContext";
import AccNav from "./AccNav";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const NavBar = () => {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const { user, setUser, setShowLogin } = useContext(mainContext);
  const [accMenuIsOpen, setAccMenuIsOpen] = useState(false);
  const defaultOptions = [
    {
      option: "Home",
      path: "/",
      className: "fa-solid fa-house",
      execute() {
        navigate(this.path);
      },
    },
    {
      option: "Top Movies",
      path: "/TopMovies",
      className: "fa-solid fa-film",
      execute() {
        navigate(this.path);
      },
    },
    {
      option: "Top Shows",
      path: "/TopShows",
      className: "fa-solid fa-tv",
      execute() {
        navigate(this.path);
      },
    },
    user
      ? {
          option: "Account",
          path: null,
          className: "fa-solid fa-user",
          avatar: user.avatar[0],
          execute() {
            setAccMenuIsOpen(!accMenuIsOpen);
          },
        }
      : {
          option: "Login",
          path: null,
          className: "fa-solid fa-right-to-bracket",
          execute() {
            setShowLogin(true);
          },
        },
  ];

  const handleNav = (item) => {
    item.execute();
    setBurgerIsOpen(false);
  };

  return (
    <>
      <Hamburger
        rounded
        direction="right"
        color="#3c6e71"
        toggled={burgerIsOpen}
        toggle={setBurgerIsOpen}
      />
      {accMenuIsOpen && (
        <AccNav
          user={user}
          setUser={setUser}
          accMenuIsOpen={accMenuIsOpen}
          setAccMenuIsOpen={setAccMenuIsOpen}
          currentLocation={currentLocation}
        />
      )}
      {burgerIsOpen ? (
        <MobileNav
          defaultOptions={defaultOptions}
          handleNav={handleNav}
          currentLocation={currentLocation}
          user={user}
          setAccMenuIsOpen={setAccMenuIsOpen}
        />
      ) : (
        <DesktopNav
          defaultOptions={defaultOptions}
          handleNav={handleNav}
          currentLocation={currentLocation}
          user={user}
          setAccMenuIsOpen={setAccMenuIsOpen}
        />
      )}
    </>
  );
};

export default NavBar;
