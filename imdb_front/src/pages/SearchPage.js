import React from "react";
import MovieCard from "../components/SmallCard";
import { useParams, useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
import usePaginate from "../hooks/usePaginate";
const SearchPage = () => {
  const params = useParams();

  const location = useLocation();
  const pathname = location.pathname;
  const page = location.search.replace(/\D/g, "");
  const data = usePaginate("multi", page ? page : 1, "search", params.title);

  return (
    <div>
      <div className="flex flex-wrap gap-10 justify-center ">
        {data.results.map((item) => (
          <MovieCard item={item} key={item.id} type={item.media_type} />
        ))}
      </div>
      <Pagination
        pageCount={data.total_pages >= 500 ? 500 : data.total_pages}
        pathname={pathname}
      />
    </div>
  );
};

export default SearchPage;
