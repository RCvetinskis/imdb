import React, { useContext } from "react";
import mainContext from "../../context/MoviesContext";
import { SERVER_API } from "../../utilities/APIS";
import MovieCard from "../../components/SmallCard";
import useGetUserShows from "../../hooks/useGetUserShows";

const LikedTvShowsPage = () => {
  const { user } = useContext(mainContext);
  const userLikedMovies = user.likes.category.tv;
  const data = useGetUserShows(SERVER_API.tv, userLikedMovies);

  return (
    <div>
      <div className="flex flex-wrap gap-10 justify-center ">
        {data.data.map((item) => (
          <MovieCard item={item} key={item.id} type={item.media_type} />
        ))}
      </div>
    </div>
  );
};

export default LikedTvShowsPage;
