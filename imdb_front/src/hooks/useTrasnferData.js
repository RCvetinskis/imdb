import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../utilities/APIS";

const useTransferData = (tmbdbApi, category, user) => {
  const [data, setData] = useState({
    results: [],
    isLoading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(tmbdbApi);
        const showData = response.data;

        const backendResponse = await axios.post(SERVER_API.add_show, {
          category,
          show: showData,
          userId: user?._id,
        });

        setData({
          results: backendResponse.data.data,
          isLoading: false,
        });
      } catch (error) {
        setData({
          results: [],
          isLoading: false,
        });
        console.error(error);
      }
    };

    fetchData();
  }, [tmbdbApi, category, user]);

  return data;
};

export default useTransferData;
