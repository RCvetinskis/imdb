import React, { useContext } from "react";
import mainContext from "../../context/MoviesContext";
import Card from "../../components/ShowsCard/Card";
import { SERVER_API } from "../../utilities/APIS";
import useGetUserShows from "../../hooks/useGetUserShows";

const LikedMoviesPage = () => {
  const { user } = useContext(mainContext);
  const userLikedMovies = user.likes.category.movie;
  const data = useGetUserShows(SERVER_API.movies, userLikedMovies);

  return (
    <div>
      <div className="flex flex-wrap gap-10 justify-center ">
        {data.data.map((item) => (
          <Card item={item} key={item.id} type={item.media_type} />
        ))}
      </div>
    </div>
  );
};

export default LikedMoviesPage;
