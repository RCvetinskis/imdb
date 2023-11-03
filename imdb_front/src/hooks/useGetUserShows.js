import { useEffect, useState } from "react";
import axios from "axios";
const useGetUserShows = (url, idsArray) => {
  const [data, setData] = useState([
    {
      dynamicData: [],
      comments: [],
      id: 0,
      media_type: "tv",
      _id: 0,
    },
  ]);
  useEffect(() => {
    axios.post(url, { idsArray }).then((response) => {
      if (response.data.error) {
        console.log(response.data.message);
      } else {
        setData(response.data.data);
      }
    });
  }, [url, idsArray]);

  return data;
};

export default useGetUserShows;
