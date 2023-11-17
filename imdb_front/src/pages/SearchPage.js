import React from "react";
import Card from "../components/Card";
import { useSearchParams, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { TMDB_API } from "../utilities/APIS";
import useGetData from "../hooks/useGetData";
import LoadingScreen from "../components/loading/LoadingScreen";
const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const page = Number(searchParams.get("page"));
  const API = TMDB_API.search(params.title, "multi", page ? page : 1);
  const data = useGetData(API, false);

  const handlePageClick = (event) => {
    const pageNo = event.selected + 1;
    setSearchParams((prev) => {
      prev.set("page", pageNo);
      return prev;
    });
  };
  return (
    <div>
      {data.isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="flex flex-wrap gap-10 justify-center ">
            {data.results.map((item) => (
              <Card item={item} key={item.id} type={item.media_type} />
            ))}
          </div>
          <Pagination
            pageCount={data.total_pages >= 500 ? 500 : data.total_pages}
            handlePageClick={handlePageClick}
            pageParams={page}
          />
        </>
      )}
    </div>
  );
};

export default SearchPage;
