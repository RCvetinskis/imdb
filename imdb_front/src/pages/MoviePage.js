import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../utilities/tmdbRequests";

const MoviePage = () => {
  const params = useParams();
  const [item, setItem] = useState({});
  const imgLink = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    getMovieById(params.movieId, setItem);
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

export default MoviePage;
