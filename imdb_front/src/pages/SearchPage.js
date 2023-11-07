import React from "react";
import Card from "../components/ShowsCard/Card";
import { useParams, useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
import { TMDB_API } from "../utilities/APIS";
import useGetDataTMDB from "../hooks/useGetDataTMDB";

const SearchPage = () => {
  const params = useParams();
  const location = useLocation();
  const pathname = location.pathname;
  const page = location.search.replace(/\D/g, "");
  const API = TMDB_API.search(params.title, "multi", page ? page : 1);
  const data = useGetDataTMDB(API, page);

  return (
    <div>
      <div className="flex flex-wrap gap-10 justify-center ">
        {data.results.map((item) => (
          <Card item={item} key={item.id} type={item.media_type} />
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
