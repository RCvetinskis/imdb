import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { TMDB_API } from "../utilities/APIS";
import useGetData from "../hooks/useGetData";
import mainContext from "../context/MainContext";
const EpisodePage = () => {
  const { tvId, seasonNo, episodeNo } = useParams();
  const { imgLink } = useContext(mainContext);
  const data = useGetData(
    TMDB_API.season(`/tv/${tvId}/season/${seasonNo}/episode/${episodeNo}?`)
  );

  return (
    <div>
      <img src={imgLink + data.still_path} alt="" />
    </div>
  );
};

export default EpisodePage;
