import React, { useState, useEffect } from "react";
import axios from "axios";
const useGetData = (url) => {
  const [data, setData] = useState({
    results: [],
  });

  // default get request
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return data;
};

export default useGetData;
