import React, { useContext } from "react";
import mainContext from "../../context/MainContext";
import { classNameRating } from "../../utilities/designFunctions";
import { Link } from "react-router-dom";
const EpisodeCard = ({ episode, tvId }) => {
  const { imgLink } = useContext(mainContext);
  return (
    <div className="episode-card card">
      <Link
        to={`/tv/${tvId}/season/${episode.season_number}/episode/${episode.episode_number}`}
      >
        <img
          src={imgLink + episode.still_path}
          alt={`image for episode:${episode.name}`}
        />
      </Link>

      <div className="card-info">
        <p className="title">{episode.name}</p>

        <p className="text-xs">
          Episode no: {""}
          <b>{episode.episode_number}</b>
        </p>

        <div className="date">
          Air date: {""}
          <span>{episode.air_date}</span>
        </div>

        <p className={classNameRating(episode.vote_average)}>
          {episode.vote_average?.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default EpisodeCard;
