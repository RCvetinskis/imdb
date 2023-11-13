import React from "react";
import { useContext } from "react";
import mainContext from "../../context/MainContext";
import { SERVER_API } from "../../utilities/APIS";
import UserShowsComponent from "../../components/userShows/UserShowsComponent.js";
const SeenTvPage = () => {
  const { user } = useContext(mainContext);

  return (
    <div>
      <UserShowsComponent
        API={SERVER_API.user_shows_list}
        userShowsArr={user.already_seen.category.tv}
        type={"tv"}
      />
    </div>
  );
};

export default SeenTvPage;
