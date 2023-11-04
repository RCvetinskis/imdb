import React from "react";
import { Link } from "react-router-dom";
import { classNameRating } from "../../utilities/designFunctions";
const Card = ({ item, type }) => {
  const imgLink = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="card">
      <Link to={`/${type}/${item.id}`}>
        <img src={imgLink + item.poster_path} alt={item.title} />
      </Link>

      <div className="card-info">
        <p className="title">{type === "tv" ? item.name : item.title}</p>
        {item.genres ? (
          <div className="genres flex flex-wrap gap-2">
            {item.genres.map((genre) => (
              <p key={genre.id} className="genre">
                {genre.name}
              </p>
            ))}
          </div>
        ) : (
          <div className="genres flex flex-wrap gap-2">
            {item.genre_names?.map((genre, index) => (
              <p key={index} className="genre">
                {genre}
              </p>
            ))}
          </div>
        )}

        <p className={classNameRating(item.vote_average)}>
          {item.vote_average?.toFixed(1)}
        </p>
        <p className="date">
          Release date:{" "}
          <span>{type === "tv" ? item.first_air_date : item.release_date}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
