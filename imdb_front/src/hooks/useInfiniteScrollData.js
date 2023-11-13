import React, { useState, useEffect } from "react";
import axios from "axios";
const useInfiniteScrollData = (
  API,
  containerRef,
  data,
  totalPages,
  page,
  setPage
) => {
  const [getMoreData, setGetMoreData] = useState(data);

  useEffect(() => {
    const fetchData = async (newPage) => {
      if (newPage <= totalPages) {
        const nextPageAPI = `${API}&page=${newPage}`;
        await axios
          .get(nextPageAPI)
          .then((response) => {
            const newData = response.data.results.slice(0, 5);
            data.results = [...data.results, ...newData];
            setGetMoreData({ ...data });
            setPage(newPage);
          })
          .then((error) => {
            console.log(error);
          });
      }
    };

    const handleScroll = () => {
      if (
        containerRef.current &&
        containerRef.current.scrollLeft + containerRef.current.clientWidth >=
          containerRef.current.scrollWidth
      ) {
        if (data && totalPages) fetchData(page + 1);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef, page, totalPages, data]);
  return getMoreData;
};

export default useInfiniteScrollData;
