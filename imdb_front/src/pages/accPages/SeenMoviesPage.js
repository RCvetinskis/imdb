import React from "react";
import { useContext } from "react";
import mainContext from "../../context/MainContext";
import UserShowsComponent from "../../components/userShows/UserShowsComponent.js";
const SeenMoviesPage = () => {
  const { user } = useContext(mainContext);
  return (
    <div>
      <UserShowsComponent
        userShowsArr={user.already_seen.category.movie}
        type={"movie"}
      />
    </div>
  );
};

export default SeenMoviesPage;
