import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const inputRef = useRef();
  const nav = useNavigate();

  const handleSearchClick = (e) => {
    e.preventDefault();
    nav(`search/${inputRef.current.value}?page=1`);
    inputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSearchClick} className="search-container">
      <div className="input-container">
        <input
          placeholder="Search"
          className="search-input"
          ref={inputRef}
          type="text"
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>

      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
