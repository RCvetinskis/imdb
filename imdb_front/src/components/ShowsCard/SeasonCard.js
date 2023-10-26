import React from "react";

const SeasonCard = ({ season }) => {
  const imgLink = "https://image.tmdb.org/t/p/original/";
  return (
    <div className="season">
      <div className="img-container">
        {season.poster_path && (
          <img
            width={200}
            height={200}
            src={imgLink + season.poster_path}
            alt={season.name}
            className="seasonImg"
          />
        )}
      </div>
      <div className="info">
        <p>{season.name}</p>
        <p>
          <span>Episodes:</span>
          {season.episode_count}
        </p>
        <p className="rating">
          <span>Rating:{season.vote_average}</span>
        </p>
      </div>

      {season.overview.length > 0 ? (
        <div className="description">
          {" "}
          <span>Description:</span> {season.overview}{" "}
        </div>
      ) : null}
    </div>
  );
};

export default SeasonCard;
