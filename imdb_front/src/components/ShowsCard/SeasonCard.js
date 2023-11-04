import React from "react";
import { classNameRating } from "../../utilities/designFunctions";
const SeasonCard = ({ season }) => {
  const imgLink = "https://image.tmdb.org/t/p/original/";
  return (
    <div className="season-card card">
      <div className="img-container">
        {season.poster_path && (
          <img src={imgLink + season.poster_path} alt={season.name} />
        )}
      </div>
      <div className="card-info">
        <p className="title">{season.name}</p>
        <p className="season-no">Season:{season.season_number}</p>
        <p className="episodes">Episodes:{season.episode_count}</p>

        <p className={classNameRating(season.vote_average)}>
          {season.vote_average?.toFixed(1)}
        </p>
        {season.air_date ? (
          <p className="date">
            Release date: <span> {season.air_date}</span>
          </p>
        ) : null}

        {season.overview.length > 0 ? (
          <div className="description">{season.overview} </div>
        ) : null}
      </div>
    </div>
  );
};

export default SeasonCard;
