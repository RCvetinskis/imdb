import React, { useState, useEffect } from "react";
import axios from "axios";
const useGetData = (API) => {
  const [data, setData] = useState({
    results: [],
    isLoading: true,
    error: "",
  });
  useEffect(() => {
    const getData = async () => {
      try {
        setData((prevData) => ({ ...prevData, isLoading: true }));
        const { data } = await axios.get(API);

        setData({
          results: data.results || [],
          isLoading: false,
          error: "",
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [API]);

  return data;
};

export default useGetData;
