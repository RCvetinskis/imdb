import React, { useContext } from "react";
import mainContext from "../../context/MainContext";
import { SERVER_API } from "../../utilities/APIS";
import { useSearchParams } from "react-router-dom";
import UserShowsSection from "./UserShowsSection";
import FilterShows from "../FilterShows";
import useSortOptions from "../../hooks/useSortOptions";
import Genres from "../Genres";
import useGetUserShows from "../../hooks/useGetUserShows.js";
const UserShowsComponent = ({ userShowsArr, type }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loadingData } = useContext(mainContext);
  const searchParamsString = new URLSearchParams(searchParams).toString();
  const API = SERVER_API.user_shows_list(
    `?limit=3&idsArray=${userShowsArr}&category=${type}&${searchParamsString}`
  );

  // options and genres
  const { genres, languages, primary_release_year, first_air_date_year } =
    useGetUserShows(API);

  const sortOptions = useSortOptions();
  const sortOptionsSortBy = sortOptions.sortBy.filter(
    (option) => !option.value.includes("revenue")
  );

  const dateOptions =
    type === "movie"
      ? primary_release_year.map((date) => ({ label: date, value: date }))
      : first_air_date_year.map((date) => ({ label: date, value: date }));

  // filter to get language name and value from user show languages api call
  const userShowsLanguages = sortOptions.languageOptions.filter((option) =>
    languages.includes(option.value)
  );

  const handlePageClick = (event) => {
    const pageNo = event.selected + 1;
    setSearchParams((prev) => {
      prev.set("page", pageNo);
      return prev;
    });
  };

  return (
    <div>
      <div className="filters-container flex justify-evenly my-5">
        <FilterShows
          options={userShowsLanguages}
          placeholder={"Select Language..."}
          callName={"with_original_language"}
          setSearchParams={setSearchParams}
        />
        <FilterShows
          options={dateOptions}
          placeholder={"Select Years..."}
          setSearchParams={setSearchParams}
          callName={
            type === "movie" ? "primary_release_year" : "first_air_date_year"
          }
        />
        <FilterShows
          options={sortOptionsSortBy}
          placeholder={"Sort by..."}
          setSearchParams={setSearchParams}
          callName={"sort_by"}
        />
      </div>
      <Genres
        genres={genres}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <UserShowsSection
        API={API}
        searchParams={searchParams}
        loadingData={loadingData}
        handlePageClick={handlePageClick}
      />
    </div>
  );
};

export default UserShowsComponent;
