import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../utilities/APIS";

const useTransferData = (tmbdbApi, category, user) => {
  const [data, setData] = useState({
    dynamicData: [],
  });

  useEffect(() => {
    // finds movie from tmbapi, saves to backend and from backend brings to frontend
    const getAndTransferData = async () => {
      await axios
        .get(tmbdbApi)
        .then(async (response) => {
          const showData = await response.data;

          await axios
            .post(SERVER_API.add_show, {
              category,
              show: showData,
              userId: user?._id,
            })
            .then(async (response) => {
              if (response.data.error) {
                console.log(response.data.message);
              } else {
                setData(response.data.data);
              }
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    };
    getAndTransferData();
  }, [tmbdbApi, category, user]);

  return data;
};

export default useTransferData;
