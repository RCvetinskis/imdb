import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { classNameRating } from "../utilities/designFunctions";
import useGenres from "../hooks/useGenres";
import { setGenreNames } from "../utilities/setGenreNames";
import mainContext from "../context/MainContext";
const Card = ({ item, type }) => {
  const { imgLink } = useContext(mainContext);

  const genres = useGenres(type);
  const show = useMemo(() => setGenreNames(item, genres), [genres]);

  return (
    <div className="card">
      <Link to={`/${type}/${show.id}`}>
        <img src={imgLink + show.poster_path} alt={show.title} />
      </Link>

      <div className="card-info">
        <p className="title">{type === "tv" ? show.name : show.title}</p>
        <div className="genres flex flex-wrap gap-2">
          {show.genres?.map((genre) => (
            <p key={genre?.id} className="genre">
              {genre?.name}
            </p>
          ))}
        </div>

        <p className={classNameRating(show.vote_average)}>
          {show.vote_average?.toFixed(1)}
        </p>
        <p className="date">
          Release date:{" "}
          <span>{type === "tv" ? show.first_air_date : show.release_date}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
