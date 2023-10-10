import React, { useContext, useEffect } from "react";
import moviesContext from "../context/MoviesContext";
import MovieCard from "../components/SmallCard";
import { useParams } from "react-router-dom";
import { searchData } from "../utilities/tmdbRequests";
import Pagination from "../components/Pagination";
const SearchPage = () => {
  const params = useParams();
  const { searchResult, setSearchResult } = useContext(moviesContext);

  useEffect(() => {
    searchData(params.title, setSearchResult);
  }, []);

  console.log(params);
  return (
    <div>
      <div className="flex flex-wrap gap-10 justify-center ">
        {searchResult.results.map((item) => (
          <MovieCard item={item} key={item.id} type={"tv"} />
        ))}
      </div>
      <Pagination pageCount={500} setData={setSearchResult} />
    </div>
  );
};

export default SearchPage;
