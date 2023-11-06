import React from "react";
import SearchBar from "./SearchBar";
import NavBar from "../components/Navigation/NavBar";
const Header = () => {
  return (
    <header className="header">
      <nav>
        <NavBar />
      </nav>
      <div className="hero">
        <h1 className="text-3xl text-center">Movies & Tv Shows Application</h1>
      </div>
      <SearchBar />
    </header>
  );
};

export default Header;
