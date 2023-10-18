import React, { useState, useEffect } from "react";
import axios from "axios";
import { TMDB_API } from "../utilities/APIS";
const usePaginate = (type, page, call, name) => {
  // custom usePaginate hook returns back data with pages
  // checks what call to do
  const urlApi =
    call === "top"
      ? TMDB_API.top(type, page)
      : TMDB_API.search(name, type, page);

  const [data, setData] = useState({
    results: [],
    page: 0,
    total_pages: 0,
    total_results: 0,
  });

  useEffect(() => {
    axios
      .get(urlApi)
      .then((response) => {
        setData(
          response.data || {
            page: response.data.page,
            results: response.data.results,
            total_pages: response.data.total_pages,
            total_results: response.data.total_results,
          }
        );
      })
      .catch((error) => console.log(error));
  }, [page, name]);

  return data;
};

export default usePaginate;
