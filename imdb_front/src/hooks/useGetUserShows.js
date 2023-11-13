import { useContext, useEffect, useState } from "react";
import axios from "axios";
import mainContext from "../context/MainContext";
const useGetUserShows = (url) => {
  const [data, setData] = useState({
    results: [],
    page: 0,
    total_pages: 0,
    total_results: 0,
    isLoading: true,
    genres: [],
    languages: [],
    primary_release_year: [],
    first_air_date_year: [],
  });
  const { setLoadingData } = useContext(mainContext);

  useEffect(() => {
    const fetchUsersShows = async () => {
      try {
        setLoadingData(true);
        const { data } = await axios.get(url);
        if (!data.error) {
          setData(data.data);
          setData((prev) => ({
            ...prev,
            results: data.data.results,
            total_pages: data.data.total_pages,
            total_results: data.data.total_results,
            isLoading: false,
            genres: data.data.genres,
            languages: data.data.languages,
            primary_release_year: data.data.primary_release_year,
            first_air_date_year: data.data.first_air_date_year,
          }));
        } else {
          console.log(data.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchUsersShows();
  }, [url]);

  return data;
};

export default useGetUserShows;
