import React from "react";
import { useParams } from "react-router-dom";
import { TMDB_API } from "../utilities/APIS";
import useGetData from "../hooks/useGetData";
const BigCard = ({ type }) => {
  const params = useParams();
  const key = Object.keys(params);
  // sets data for current card
  const api = TMDB_API.by_id(type, params[key]);
  const data = useGetData(api);

  const imgLink = "https://image.tmdb.org/t/p/original/";
  return (
    <div className="card-page">
      <div className="card">
        <img
          src={imgLink + data.poster_path}
          alt={data.title}
          className="cardImg"
        />

        <div className="cardInfo">
          <p className="cardTitle">{data.title}</p>
          <p className="cardDescription">{data.overview}</p>
          <p className="cardRating">{data.vote_average}</p>
          <p>
            Release date: <span>{data.release_date}</span>
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
