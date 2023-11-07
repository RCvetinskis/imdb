import React, { useState, useEffect } from "react";
import axios from "axios";

const useGetDataTMDB = (API, page) => {
  const [data, setData] = useState({
    results: [],
    page: 0,
    total_pages: 0,
    total_results: 0,
    isLoading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${API}&page=${page}`)
        .then(async (response) => {
          setData(
            response.data || {
              page: response.data.page,
              results: response.data.results,
              total_pages: response.data.total_pages,
              total_results: response.data.total_results,
              isLoading: false,
            }
          );
        })
        .catch((error) => {
          console.log(error);
          setData((prevData) => ({ ...prevData, isLoading: false }));
        });
    };
    setData((prevData) => ({ ...prevData, isLoading: false }));
    fetchData();
  }, [API, page]);

  return data;
};

export default useGetDataTMDB;
