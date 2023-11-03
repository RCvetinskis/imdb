import React from "react";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
import Card from "../components/ShowsCard/Card";
import usePaginate from "../hooks/usePaginate";
import useGenres from "../hooks/useGenres";
import { setGenreNames } from "../utilities/setGenreNames";
const TopRatedTv = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const page = location.search.replace(/\D/g, "");
  const data = usePaginate("tv", page, "top");
  const genres = useGenres("tv");
  const updatedData = setGenreNames(data, genres);

  return (
    <div className="top-rated-movies">
      <div className="flex flex-wrap gap-10 justify-center ">
        {updatedData.results.map((item) => (
          <Card item={item} key={item.id} type={"tv"} />
        ))}
      </div>
      <Pagination
        pageCount={data.total_pages >= 500 ? 500 : data.total_pages}
        pathname={pathname}
      />
    </div>
  );
};

export default TopRatedTv;
