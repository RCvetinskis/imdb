import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const inputRef = useRef();
  const nav = useNavigate();

  const handleSearchClick = () => {
    nav(`search/${inputRef.current.value}`);
    inputRef.current.value = "";
  };
  return (
    <div className="search-container">
      <div className="input-container">
        <input
          placeholder="Search"
          className="search-input"
          ref={inputRef}
          type="text"
        />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>

      <button onClick={() => handleSearchClick()} className="search-btn">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
