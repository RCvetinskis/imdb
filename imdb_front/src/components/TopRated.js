import React from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
import Card from "./Card";
import useGenres from "../hooks/useGenres";
import { setGenreNames } from "../utilities/setGenreNames";
import Genres from "./Genres";
import useGetDataTMDB from "../hooks/useGetDataTMDB";
import { TMDB_API } from "../utilities/APIS";
const TopRated = ({ type }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));
  const API = TMDB_API.top(type, page ? page : 1);
  const data = useGetDataTMDB(API, page);
  const genres = useGenres(type);
  const dataToDisplayGenres = setGenreNames(data, genres, true);

  let filterData = data;
  const selectedGenres = searchParams
    .getAll("with_genres")
    .flatMap((genres) => genres.split(",").map(String));
  if (selectedGenres.length > 0) {
    filterData = {
      ...data,
      results: data.results.filter((show) =>
        selectedGenres.every((genreId) =>
          show.genre_ids.includes(Number(genreId))
        )
      ),
    };
  }

  const handlePageClick = (event) => {
    const pageNo = event.selected + 1;
    setSearchParams((prev) => {
      prev.set("page", pageNo);
      return prev;
    });
  };

  return (
    <div className="top-rated-movies">
      <Genres
        data={dataToDisplayGenres.results}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className="flex flex-wrap gap-10 justify-center ">
        {filterData?.results.map((item) => (
          <Card item={item} key={item.id} type={type} />
        ))}
      </div>
      <Pagination
        pageCount={data.total_pages >= 500 ? 500 : data.total_pages}
        handlePageClick={handlePageClick}
        searchParams={searchParams}
        pageParams={page}
      />
    </div>
  );
};

export default TopRated;
