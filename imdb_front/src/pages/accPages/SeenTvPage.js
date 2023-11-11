import React from "react";
import { useContext } from "react";
import mainContext from "../../context/MainContext";
import useGetUserShows from "../../hooks/useGetUserShows";
import Card from "../../components/Card";
import { SERVER_API } from "../../utilities/APIS";
const SeenTvPage = () => {
  const { user } = useContext(mainContext);
  const userSeenTv = user.already_seen.category.tv;
  const data = useGetUserShows(SERVER_API.already_seen_tv, userSeenTv);
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

export default SeenTvPage;
