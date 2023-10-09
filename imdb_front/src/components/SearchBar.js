import React, { useRef } from "react";

import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const inputRef = useRef();
  const nav = useNavigate();

  return (
    <div>
      <input className="text-black" ref={inputRef} type="text" />
      <button
        onClick={() => nav(`search/${inputRef.current.value}`)}
        className="btn bg-teal-800"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
