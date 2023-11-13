import React from "react";
import LoadingScreen from "../loading/LoadingScreen";
import useGetUserShows from "../../hooks/useGetUserShows";
import Card from "../Card";
import Pagination from "../Pagination";
const UserShowsSection = ({
  API,
  searchParams,
  loadingData,
  handlePageClick,
}) => {
  const data = useGetUserShows(API);
  const pageParams = Number(searchParams.get("page"));

  return (
    <div>
      {loadingData ? (
        <LoadingScreen />
      ) : data.results && data.results.length > 0 ? (
        <div className="flex flex-wrap gap-10 justify-center">
          {data.results.map((item) => (
            <Card
              item={item.dynamicData}
              key={item.id}
              type={item.media_type}
            />
          ))}
        </div>
      ) : (
        <h1 className="text-center text-3xl">No Liked/Seen shows found</h1>
      )}
      <Pagination
        pageCount={data.total_pages}
        handlePageClick={handlePageClick}
        pageParams={pageParams}
      />
    </div>
  );
};

export default UserShowsSection;
