import React, { useContext, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { TMDB_API } from "../../utilities/APIS";
import mainContext from "../../context/MainContext";
import SeasonCard from "./SeasonCard";
import UserAdjustment from "./UserAdjustment";
import useTransferData from "../../hooks/useTrasnferData";
import Comments from "../comments/Comments";
import { classNameRating } from "../../utilities/designFunctions";
import YoutubeModal from "./YoutubeModal";
const MoreInfoCard = ({ type }) => {
  const { user, setUser } = useContext(mainContext);
  const [seasonsModal, setSeasonsModal] = useState(false);
  const seasonsModalRef = useRef(null);
  const [openTrailer, setOpenTrailer] = useState(false);
  const params = useParams();
  const key = Object.keys(params);
  const showId = params[key];

  // gets data for current card
  const TMBDB_API_BY_ID = TMDB_API.by_id(type, showId);
  const data = useTransferData(TMBDB_API_BY_ID, type);
  const imgLink = "https://image.tmdb.org/t/p/original/";

  const scrollToShowSeasons = () => {
    if (seasonsModalRef.current) {
      seasonsModalRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="more-info-container">
      {openTrailer && (
        <YoutubeModal
          type={type}
          id={showId}
          bgImage={imgLink + data.dynamicData.backdrop_path}
          setOpenTrailer={setOpenTrailer}
        />
      )}
      <div
        className="more-info-card"
        style={{
          backgroundImage: `url(${imgLink + data.dynamicData.backdrop_path})`,
        }}
      >
        <div className="card-container">
          <div className="poster-info ">
            <div className="img-container">
              <img
                src={imgLink + data.dynamicData.poster_path}
                alt={data.dynamicData.title}
                className="card-img"
              />
            </div>
            <div className="general-info">
              <h1 className="title text-3xl bold font-bold">
                {type === "tv" ? data.dynamicData.name : data.dynamicData.title}
              </h1>{" "}
              <p className={classNameRating(data.dynamicData.vote_average)}>
                {data.dynamicData.vote_average?.toFixed(1)}
              </p>
              <div className="genres flex flex-wrap gap-2">
                {data.dynamicData.genres ? (
                  data.dynamicData.genres.map((genre, index) => (
                    <p key={index} className="genre">
                      {genre.name}
                    </p>
                  ))
                ) : (
                  <p className="error">No information about genre</p>
                )}
              </div>
              {type === "tv" ? (
                <p className="date">{data.dynamicData.first_air_date}</p>
              ) : (
                <p className="date"> {data.dynamicData.release_date}</p>
              )}
              <div className="languages flex gap-2 flex-wrap">
                {data.dynamicData.spoken_languages ? (
                  data.dynamicData.spoken_languages.map((lang, index) => (
                    <p key={index} className="language">
                      {lang.english_name}
                    </p>
                  ))
                ) : (
                  <p className="error">No Languages availabe</p>
                )}
              </div>
              {data.dynamicData.homepage ? (
                <div className="homepage">
                  <a
                    className="link"
                    target="blank"
                    href={data.dynamicData.homepage}
                  >
                    {data.dynamicData.homepage}
                  </a>
                </div>
              ) : (
                <></>
              )}
              <div className="description">{data.dynamicData.overview}</div>
            </div>
          </div>

          <div className="buttons-container flex flex-wrap my-3 gap-2 items-center">
            <button
              onClick={() => setOpenTrailer(!openTrailer)}
              className="play"
            >
              <i className="fa-brands fa-youtube"></i>
            </button>
            {data.dynamicData.seasons ? (
              <button
                className="btn-open-seasons h-4"
                onClick={() => {
                  setSeasonsModal(!seasonsModal);
                  if (!seasonsModal) {
                    setTimeout(scrollToShowSeasons, 0);
                  }
                }}
              >
                Seasons:{data.dynamicData.seasons.length}
              </button>
            ) : null}
          </div>

          {user && (
            <section className="user-adjustment">
              <UserAdjustment
                user={user}
                setUser={setUser}
                type={type}
                show={data}
              />

              <Comments user={user} type={type} show={data} />
            </section>
          )}
        </div>
      </div>

      {/* modal for seasons */}
      {seasonsModal ? (
        <div
          className="seasons-modal flex flex-wrap gap-5 justify-center mt-5"
          ref={seasonsModalRef}
        >
          {data.dynamicData.seasons.map((season, index) => (
            <SeasonCard season={season} key={index} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default MoreInfoCard;
