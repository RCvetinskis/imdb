import React, { useContext, useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TMDB_API } from "../../utilities/APIS";
import mainContext from "../../context/MainContext";
import SeasonCard from "./SeasonCard";
import UserAdjustment from "./UserAdjustment";
import useTransferData from "../../hooks/useTrasnferData";
import Comments from "../comments/Comments";
import { classNameRating } from "../../utilities/designFunctions";
import YoutubeModal from "./YoutubeModal";
import LoadingScreen from "../../components/loading/LoadingScreen";
const MoreInfoCard = ({ type }) => {
  const { user, setUser, socket } = useContext(mainContext);
  const [seasonsModal, setSeasonsModal] = useState(false);
  const seasonsModalRef = useRef(null);
  const [openTrailer, setOpenTrailer] = useState(false);
  const params = useParams();
  const key = Object.keys(params);
  const showId = params[key];

  // gets data for current card
  const TMBDB_API_BY_ID = TMDB_API.by_id(type, showId);

  const { results, isLoading } = useTransferData(TMBDB_API_BY_ID, type, user);

  useEffect(() => {
    socket.on("new-shows-likes", (userData) => {
      setUser((prevData) => {
        const updatedData = { ...prevData, ...userData };
        return updatedData;
      });
    });
  }, [socket, user]);

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
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="more-info-container">
          {openTrailer && (
            <YoutubeModal
              type={type}
              id={showId}
              bgImage={imgLink + results.dynamicData.backdrop_path}
              setOpenTrailer={setOpenTrailer}
            />
          )}

          <div
            className="more-info-card"
            style={{
              backgroundImage: `url(${
                imgLink + results.dynamicData.backdrop_path
              })`,
            }}
          >
            <div className="card-container">
              <div className="poster-info">
                <div className="img-container">
                  <img
                    src={imgLink + results.dynamicData.poster_path}
                    alt={results.dynamicData.title}
                    className="card-img"
                  />
                </div>

                <div className="general-info">
                  <h1 className="title text-3xl bold font-bold">
                    {type === "tv"
                      ? results.dynamicData.name
                      : results.dynamicData.title}
                  </h1>

                  <p
                    className={classNameRating(
                      results.dynamicData.vote_average
                    )}
                  >
                    {results.dynamicData.vote_average?.toFixed(1)}
                  </p>

                  <div className="genres flex flex-wrap gap-2">
                    {results.dynamicData.genres ? (
                      results.dynamicData.genres.map((genre, index) => (
                        <p key={index} className="genre">
                          {genre.name}
                        </p>
                      ))
                    ) : (
                      <p className="error">No information about genre</p>
                    )}
                  </div>

                  {type === "tv" ? (
                    <p className="date">{results.dynamicData.first_air_date}</p>
                  ) : (
                    <p className="date">{results.dynamicData.release_date}</p>
                  )}

                  <div className="languages flex gap-2 flex-wrap">
                    {results.dynamicData.spoken_languages ? (
                      results.dynamicData.spoken_languages.map(
                        (lang, index) => (
                          <p key={index} className="language">
                            {lang.english_name}
                          </p>
                        )
                      )
                    ) : (
                      <p className="error">No Languages available</p>
                    )}
                  </div>

                  {results.dynamicData.homepage ? (
                    <div className="homepage">
                      <a
                        className="link"
                        target="blank"
                        href={results.dynamicData.homepage}
                      >
                        {results.dynamicData.homepage}
                      </a>
                    </div>
                  ) : null}

                  <div className="description">
                    {results.dynamicData.overview}
                  </div>
                </div>
              </div>

              <div className="buttons-container flex flex-wrap my-3 gap-2 items-center">
                <button
                  onClick={() => setOpenTrailer(!openTrailer)}
                  className="play"
                >
                  <i className="fa-brands fa-youtube"></i>
                </button>

                {results.dynamicData.seasons ? (
                  <button
                    className="btn-open-seasons h-4"
                    onClick={() => {
                      setSeasonsModal(!seasonsModal);
                      if (!seasonsModal) {
                        setTimeout(scrollToShowSeasons, 0);
                      }
                    }}
                  >
                    Seasons:{results.dynamicData.seasons.length}
                  </button>
                ) : null}
              </div>

              {user && (
                <section className="user-adjustment">
                  <UserAdjustment
                    user={user}
                    setUser={setUser}
                    type={type}
                    show={results}
                    socket={socket}
                  />
                  <Comments user={user} type={type} show={results} />
                </section>
              )}
            </div>
          </div>

          {/* Modal for seasons */}
          {seasonsModal && (
            <div
              className="seasons-modal flex flex-wrap gap-5 justify-center mt-5"
              ref={seasonsModalRef}
            >
              {results.dynamicData.seasons.map((season, index) => (
                <SeasonCard showId={showId} season={season} key={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MoreInfoCard;
