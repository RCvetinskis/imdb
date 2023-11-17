import React from "react";
import { useParams } from "react-router-dom";
import EpisodeCard from "../components/MoreInfoCard/EpisodeCard";
import useGetData from "../hooks/useGetData";
import { TMDB_API } from "../utilities/APIS";
const SeasonPage = () => {
  const { tvId, seasonNo } = useParams();
  const data = useGetData(TMDB_API.season(`/tv/${tvId}/season/${seasonNo}?`));

  return (
    <div>
      <div className="episodes-container flex flex-wrap justify-center gap-5">
        {data.episodes?.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} tvId={tvId} />
        ))}
      </div>
    </div>
  );
};

export default SeasonPage;
