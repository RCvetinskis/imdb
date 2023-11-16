import React from "react";
import { TMDB_API } from "../../utilities/APIS";
import DiscoverSection from "./DiscoverSection";
import FilterShows from "../FilterShows";
import useSortOptions from "../../hooks/useSortOptions";
import Genres from "../Genres";
import useGenres from "../../hooks/useGenres";
import { useLocation, useSearchParams } from "react-router-dom";

const DiscoverComponent = ({ type }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsString = new URLSearchParams(searchParams).toString();
  const API = TMDB_API.discover(
    `${pathname}?${searchParamsString ? searchParamsString : ""}`
  );
  // options for select
  const genres = useGenres(type);

  const sortOptions = useSortOptions();

  // change params on page click
  const handlePageClick = (event) => {
    const pageNo = event.selected + 1;
    setSearchParams((prev) => {
      prev.set("page", pageNo);
      return prev;
    });
  };

  return (
    <div>
      <div className="filter-container flex justify-around flex-wrap my-3">
        <FilterShows
          options={sortOptions.languageOptions}
          placeholder={"Select Language..."}
          callName={"with_original_language"}
          setSearchParams={setSearchParams}
        />
        <FilterShows
          options={sortOptions.sortBy}
          placeholder={"Sort by..."}
          callName={"sort_by"}
          setSearchParams={setSearchParams}
        />
        <FilterShows
          options={sortOptions.years}
          placeholder={"Select Years..."}
          setSearchParams={setSearchParams}
          callName={
            type === "movie" ? "primary_release_year" : "first_air_date_year"
          }
        />
      </div>
      <Genres
        genres={genres}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="movies-container">
        <DiscoverSection
          API={API}
          type={type}
          handlePageClick={handlePageClick}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
};

export default DiscoverComponent;
