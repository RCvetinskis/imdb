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
      <input className="search-input" ref={inputRef} type="text" />
      <button onClick={() => handleSearchClick()} className="btn bg-teal-800">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
