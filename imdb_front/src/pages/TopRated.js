import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import Card from "../components/ShowsCard/Card";
import usePaginate from "../hooks/usePaginate";
import useGenres from "../hooks/useGenres";
import { setGenreNames } from "../utilities/setGenreNames";
import Genres from "../components/Genres";
const TopRated = ({ type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const page = location.search.replace(/\D/g, "");
  const data = usePaginate(type, page, "top");
  const genres = useGenres(type);
  const dataWithGenres = setGenreNames(data, genres);
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

  let filterData = dataWithGenres;

  if (selectedGenres.length > 0) {
    filterData = {
      ...dataWithGenres,
      results: dataWithGenres.results.filter((show) =>
        selectedGenres.every((genreId) => show.genre_ids.includes(genreId))
      ),
    };
  }

  return (
    <div className="top-rated-movies">
      <Genres
        data={dataWithGenres.results}
        setSelectedGenres={setSelectedGenres}
      />
      <div className="flex flex-wrap gap-10 justify-center ">
        {filterData?.results.map((item) => (
          <Card item={item} key={item.id} type={type} />
        ))}
      </div>
      <Pagination
        pageCount={
          dataWithGenres.total_pages >= 500 ? 500 : dataWithGenres.total_pages
        }
        pathname={pathname}
      />
    </div>
  );
};

export default TopRated;
