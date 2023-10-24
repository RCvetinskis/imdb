import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { TMDB_API } from "../utilities/APIS";
import useGetData from "../hooks/useGetData";
import { handleLike } from "../utilities/handleClick";
import mainContext from "../context/MoviesContext";
const BigCard = ({ type }) => {
  const params = useParams();
  const key = Object.keys(params);
  // sets data for current card
  const api = TMDB_API.by_id(type, params[key]);
  const data = useGetData(api);
  const { user, setUser } = useContext(mainContext);
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
        {user && (
          <div className="btns">
            <div>
              <button className="btnCard ">Watch List</button>
              <button className="btnCard ">Seen</button>
            </div>

            <div>
              <button
                onClick={() =>
                  handleLike(user._id, data, type, "like", setUser)
                }
                className="btnCard "
              >
                Like
              </button>
              <button
                onClick={() =>
                  handleLike(user._id, data, type, "dislike", setUser)
                }
                className="btnCard "
              >
                Dislike
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BigCard;
