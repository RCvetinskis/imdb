import React from "react";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
import MovieCard from "../components/SmallCard";
import usePaginate from "../hooks/usePaginate";
const TopRatedTv = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const page = location.search.replace(/\D/g, "");
  const data = usePaginate("tv", page, "top");

  return (
    <div className="top-rated-movies">
      <div className="flex flex-wrap gap-10 justify-center ">
        {data.results.map((item) => (
          <MovieCard item={item} key={item.id} type={"tv"} />
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
