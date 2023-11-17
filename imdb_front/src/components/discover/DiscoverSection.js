import React from "react";
import useGetData from "../../hooks/useGetData";
import Card from "../Card";
import Pagination from "../Pagination";
import LoadingScreen from "../../components/loading/LoadingScreen";

const DiscoverSection = ({ API, type, handlePageClick, searchParams }) => {
  const { results, isLoading, total_pages } = useGetData(API);
  const pageParams = Number(searchParams.get("page"));

  return (
    <div className="discover-container">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="flex flex-wrap gap-5 justify-center">
            {results.map((show) => (
              <Card key={show.id} item={show} type={type} />
            ))}
          </div>
          <Pagination
            pageCount={total_pages >= 500 ? 500 : total_pages}
            handlePageClick={handlePageClick}
            pageParams={pageParams}
          />
        </>
      )}
    </div>
  );
};

export default DiscoverSection;
