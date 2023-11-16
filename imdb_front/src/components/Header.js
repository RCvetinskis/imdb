import React from "react";
import SearchBar from "./SearchBar";
import NavBar from "../components/Navigation/NavBar";
import { useLocation } from "react-router-dom";
const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <nav>
        <NavBar />
      </nav>
      {pathname === "/Settings" ? (
        <></>
      ) : (
        <>
          <div className="hero">
            <h1 className="text-3xl text-center">
              Movies & Tv Shows Application
            </h1>
          </div>
          <SearchBar />
        </>
      )}
    </header>
  );
};

export default Header;
