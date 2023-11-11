import React from "react";
import { useContext } from "react";
import mainContext from "../../context/MainContext";
import useGetUserShows from "../../hooks/useGetUserShows";
const SeenMoviesPage = () => {
  const { user } = useContext(mainContext);
  const userSeenMovies = user.already_seen.category.movie;
  const data = useGetUserShows(SERVER_API.already_seen.movies, userSeenMovies);
  return (
    <div>
      <div className="flex flex-wrap gap-10 justify-center ">
        {data.map((item) => (
          <Card item={item.dynamicData} key={item.id} type={item.media_type} />
        ))}
      </div>
    </div>
  );
};

export default SeenMoviesPage;
