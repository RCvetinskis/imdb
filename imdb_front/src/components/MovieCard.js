import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ item }) => {
  const imgLink = "https://image.tmdb.org/t/p/original/";
  return (
    <div className="card">
      <Link to={`/movie/${item.id}`} className="cardImgContainer">
        <img
          src={imgLink + item.poster_path}
          alt={item.title}
          className="cardImg"
        />
      </Link>

      <div className="cardInfo">
        <p className="cardTitle">{item.title}</p>
        <p className="cardDescription">{item.overview}</p>
        <p className="cardRating">{item.vote_average}</p>
        <p>
          Release date: <span>{item.release_date}</span>
        </p>
      </div>
      <div className="btns">
        <button className="btnCard btnWatch">Watch List</button>
        <button className="btnCard btnSeen">Seen</button>
      </div>
    </div>
  );
};

export default MovieCard;
