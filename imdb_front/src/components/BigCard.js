import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, getTvById } from "../utilities/tmdbRequests";
const BigCard = ({ type }) => {
  const params = useParams();
  const [item, setItem] = useState({});
  const imgLink = "https://image.tmdb.org/t/p/original/";
  console.log(params);
  useEffect(() => {
    if (type === "movie") {
      getMovieById(params.movieId, setItem);
    } else if (type === "tv") {
      getTvById(params.tvId, setItem);
    } else {
      console.log("coudnt get type");
    }
  }, []);
  return (
    <div className="card-page">
      <div className="card">
        <img
          src={imgLink + item.poster_path}
          alt={item.title}
          className="cardImg"
        />

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
    </div>
  );
};

export default BigCard;
