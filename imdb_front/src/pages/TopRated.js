import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import Card from "../components/ShowsCard/Card";
import useGenres from "../hooks/useGenres";
import { setGenreNames } from "../utilities/setGenreNames";
import Genres from "../components/Genres";
import useGetDataTMDB from "../hooks/useGetDataTMDB";
import { TMDB_API } from "../utilities/APIS";
const TopRated = ({ type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const page = location.search.replace(/\D/g, "");
  const API = TMDB_API.top(type, page);
  const data = useGetDataTMDB(API, page);
  const genres = useGenres(type);
  const dataToDisplayGenres = setGenreNames(data, genres, true);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    if (!pathname.includes("page")) {
      if (type === "movie") {
        navigate(`/top_movies?page=${page ? page : 1}`);
      } else {
        navigate(`/top_shows?page=${page ? page : 1}`);
      }
    }
  }, [pathname]);

  let filterData = data;

  if (selectedGenres.length > 0) {
    filterData = {
      ...data,
      results: data.results.filter((show) =>
        selectedGenres.every((genreId) => show.genre_ids.includes(genreId))
      ),
    };
  }

  return (
    <div className="top-rated-movies">
      <Genres
        data={dataToDisplayGenres.results}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      <div className="flex flex-wrap gap-10 justify-center ">
        {filterData?.results.map((item) => (
          <Card item={item} key={item.id} type={type} />
        ))}
      </div>
      <Pagination
        pageCount={data.total_pages >= 500 ? 500 : data.total_pages}
        pathname={pathname}
      />
    </div>
  );
};

export default TopRated;
