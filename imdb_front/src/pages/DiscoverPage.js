import React, { useState } from "react";
import { TMDB_API } from "../utilities/APIS";
import DiscoverSection from "../components/discover/DiscoverSection";
import DiscoverSelect from "../components/discover/DiscoverSelect";
import useSortOptions from "../hooks/useSortOptions";
import Genres from "../components/Genres";
import useGenres from "../hooks/useGenres";
import { useLocation } from "react-router-dom";

const DiscoverPage = ({ type }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const search = location.search;

  const [apiParams, setApiParams] = useState({
    with_original_language: "en",
    page: "1",
    sort_by: "popularity.desc",
    year: 2023,
  });

  const API = TMDB_API.discover(`${pathname}?${search}`);

  const genres = useGenres(type);
  const sortOptions = useSortOptions();

  return (
    <div>
      <div className="filter-container">
        <DiscoverSelect
          options={sortOptions.languageOptions}
          pathname={pathname}
          placeholder={"Select Language..."}
          apiParams={apiParams}
          setApiParams={setApiParams}
          callName={"&with_original_language"}
        />
        <DiscoverSelect
          options={sortOptions.sortBy}
          pathname={pathname}
          setApiParams={setApiParams}
          placeholder={"Sort by..."}
          apiParams={apiParams}
          setApiParams={setApiParams}
          callName={"sort_by"}
        />
        <DiscoverSelect
          options={sortOptions.years}
          pathname={pathname}
          setApiParams={setApiParams}
          placeholder={"Select Years..."}
          apiParams={apiParams}
          callName={"year"}
        />
      </div>

      <div className="movies-container">
        <Genres
          genres={genres}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />
        <DiscoverSection API={API} apiParams={apiParams} />
      </div>
    </div>
  );
};

export default DiscoverPage;
