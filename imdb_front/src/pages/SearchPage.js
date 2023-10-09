import React, { useContext, useEffect } from "react";
import moviesContext from "../context/MoviesContext";
import MovieCard from "../components/MovieCard";
import { useParams } from "react-router-dom";
import { searchData } from "../utilities/tmdbRequests";

const SearchPage = () => {
  const params = useParams();
  const { searchResult, setSearchResult } = useContext(moviesContext);
  console.log(params);
  useEffect(() => {
    searchData(params.title, setSearchResult);
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-10 justify-center ">
        {searchResult.map((item) => (
          <MovieCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
