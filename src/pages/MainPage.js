import React from "react";
import MovieCard from "../components/MovieCard";
const MainPage = () => {
  return (
    <div className="flex flex-wrap gap-10 justify-center ">
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
    </div>
  );
};

export default MainPage;
