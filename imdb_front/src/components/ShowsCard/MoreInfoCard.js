import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { TMDB_API } from "../../utilities/APIS";
import useGetData from "../../hooks/useGetData";
import mainContext from "../../context/MoviesContext";
import SeasonCard from "./SeasonCard";
import UserAdjustment from "./UserAdjustment";
const MoreInfoCard = ({ type }) => {
  const { user, setUser } = useContext(mainContext);
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const key = Object.keys(params);

  // sets data for current card
  const api = TMDB_API.by_id(type, params[key]);
  const data = useGetData(api);
  // console.log(data.vote_average.toFixed(1));
  const imgLink = "https://image.tmdb.org/t/p/original/";
  return (
    <div className="more-info-container">
      <div className="more-info-card">
        <p>{type.toUpperCase()}</p>
        <h1 className="title">
          {/* title for tvs called name for movies title */}
          {type === "tv" ? data.name : data.title}
        </h1>

        <div className="img-container">
          <img
            src={imgLink + data.poster_path}
            alt={data.title}
            className="cardImg"
          />
          <div className="info-container">
            <div className="main-info">
              <div className="release-date">
                {" "}
                {type === "tv" ? (
                  <div className="flex flex-col">
                    <span>Release Date: {data.first_air_date}</span>

                    <>
                      <span>Last air date: {data.last_air_date}</span>
                    </>
                  </div>
                ) : (
                  <div>
                    <span>Release Date: {data.release_date}</span>
                  </div>
                )}
              </div>

              <div className="genres flex flex-wrap gap-2">
                <span>Genres:</span>
                {data.genres ? (
                  data.genres.map((genre, index) => (
                    <p key={index} className="genre">
                      {genre.name}
                    </p>
                  ))
                ) : (
                  <p className="error">No information about genre</p>
                )}
              </div>
              <p className="description">
                <span>Description:</span>
                {data.overview}
              </p>
              <div className="rating">
                <span>Rating:</span>
                {data.vote_average && data.vote_average.toFixed(1)}
              </div>
            </div>
            <div className="more-info">
              <div className="languages flex gap-2 flex-wrap">
                <span> Languages:</span>
                {data.spoken_languages ? (
                  data.spoken_languages.map((lang, index) => (
                    <p key={index} className="language">
                      {lang.english_name}
                    </p>
                  ))
                ) : (
                  <p className="error">No Languages availabe</p>
                )}
              </div>
              {data.homepage ? (
                <div className="homepage">
                  Home Page: {}
                  <a className="link" target="blank" href={data.homepage}>
                    {data.homepage}
                  </a>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* modal for seasons */}
      {data.seasons ? (
        <div onClick={() => setShowModal(!showModal)} className="seasons-modal">
          <p>
            {" "}
            <span>Seasons:</span>
            {data.seasons.length}
          </p>
        </div>
      ) : null}

      {user && (
        <UserAdjustment user={user} setUser={setUser} type={type} show={data} />
      )}

      {showModal ? (
        <div className="seasons-modal flex flex-wrap gap-5">
          {data.seasons.map((season, index) => (
            <SeasonCard season={season} key={index} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MoreInfoCard;
