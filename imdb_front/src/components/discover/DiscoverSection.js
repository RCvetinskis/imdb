import React from "react";
import useGetDataTMDB from "../../hooks/useGetDataTMDB";
import Card from "../Card";
import Pagination from "../Pagination";
import LoadingScreen from "../../components/loading/LoadingScreen";
const DiscoverSection = ({ API, type, handlePageClick, searchParams }) => {
  const data = useGetDataTMDB(API);
  const pageParams = Number(searchParams.get("page"));

  return (
    <div className="discover-container">
      {data.isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="flex flex-wrap gap-5 justify-center">
            {data.results.map((show) => (
              <Card key={show.id} item={show} type={type} />
            ))}
          </div>
          <Pagination
            pageCount={data.total_pages >= 500 ? 500 : data.total_pages}
            handlePageClick={handlePageClick}
            pageParams={pageParams}
          />
        </>
      )}
    </div>
  );
};

export default DiscoverSection;
