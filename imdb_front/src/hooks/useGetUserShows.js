import React, { useEffect, useState } from "react";
import axios from "axios";
const useGetUserShows = (url, idsArray) => {
  const [data, setData] = useState({
    data: [],
    message: "",
    error: false,
  });
  useEffect(() => {
    axios.post(url, { idsArray }).then((response) => {
      if (response.data.error) {
        console.log(response.data.message);
      } else {
        setData(response.data);
      }
    });
  }, []);

  return data;
};

export default useGetUserShows;
