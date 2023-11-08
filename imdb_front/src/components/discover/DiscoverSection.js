import React, { useState } from "react";
import useGetDataTMDB from "../../hooks/useGetDataTMDB";
import Card from "../ShowsCard/Card";
import Pagination from "../Pagination";
const DiscoverSection = ({ API, apiParams }) => {
  const data = useGetDataTMDB(API, 1, apiParams);

  return (
    <div className="discover-container">
      <div className="flex flex-wrap gap-5 justify-center">
        {data.results.map((show) => (
          <Card key={show.id} item={show} type={"movie"} />
        ))}
      </div>
      <Pagination
        pageCount={data.total_pages >= 500 ? 500 : data.total_pages}
      />
    </div>
  );
};

export default DiscoverSection;
