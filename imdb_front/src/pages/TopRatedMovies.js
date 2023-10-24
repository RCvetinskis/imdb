import React from "react";
import Pagination from "../components/Pagination";
import SmallCard from "../components/SmallCard";
import { useLocation } from "react-router-dom";
import usePaginate from "../hooks/usePaginate";

const TopRatedMovies = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const page = location.search.replace(/\D/g, "");
  const data = usePaginate("movie", page, "top");

  return (
    <div className="top-rated-movies">
      <div className="flex flex-wrap gap-10 justify-center ">
        {data.results.map((item) => (
          <SmallCard item={item} key={item.id} type={"movie"} />
        ))}
      </div>
      <Pagination
        pageCount={data.total_pages >= 500 ? 500 : data.total_pages}
        pathname={pathname}
      />
    </div>
  );
};

export default TopRatedMovies;
