import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/ShowsCard/Card";
import { TMDB_API } from "../utilities/APIS";
import useGenres from "../hooks/useGenres";
import { setGenreNames } from "../utilities/setGenreNames";
const MainPage = () => {
  const [data, setData] = useState({
    results: [],
  });
  const genres = useGenres("movie");

  const getPopularMovies = async () => {
    await axios
      .get(TMDB_API.popular("movie"))
      .then(async (response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
  const updatedData = setGenreNames(data, genres);

  return (
    <div className="main-page">
      <div className="flex flex-wrap gap-10 justify-center ">
        {updatedData.results.map((item) => (
          <Card item={item} key={item.id} type={"movie"} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
