import React, { useState, useRef } from "react";
import useGetDataTMDB from "../../hooks/useGetDataTMDB";
import Card from "../Card";
import useInfiniteScrollData from "../../hooks/useInfiniteScrollData";
import LoadingScreen from "../loading/LoadingScreen";
const ShowSection = ({ API, type, header }) => {
  const [page, setPage] = useState(1);
  const data = useGetDataTMDB(API, 1);
  const containerRef = useRef(null);

  useInfiniteScrollData(
    API,
    containerRef,
    data,
    data.total_pages,
    page,
    setPage
  );

  return (
    <div className="shows-container" ref={containerRef}>
      {data.isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <h1>{header}</h1>
          <div className="shows-content">
            {data.results.map((item, index) => (
              <Card item={item} key={index} type={type} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShowSection;
