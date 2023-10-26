import React from "react";
import Card from "../components/ShowsCard/Card";
import useGetData from "../hooks/useGetData";
import { TMDB_API } from "../utilities/APIS";

const MainPage = () => {
  const popularMovies = TMDB_API.popular("movie");

  const data = useGetData(popularMovies);

  return (
    <div className="main-page">
      <div className="flex flex-wrap gap-10 justify-center ">
        {data.results.map((item) => (
          <Card item={item} key={item.id} type={"movie"} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
