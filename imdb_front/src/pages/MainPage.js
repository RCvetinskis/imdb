import React, { useState } from "react";
import ShowSection from "../components/HomePage/ShowSection";
import { TMDB_API } from "../utilities/APIS";

const MainPage = () => {
  const [switchContent, setSwitchContent] = useState(true);

  const TVAPIS = {
    popular: TMDB_API.popular("tv"),
    trending: TMDB_API.trending("tv"),
    airing_today: TMDB_API.airing_today,
    on_the_air: TMDB_API.on_the_air,
  };
  const MOVIEAPIS = {
    popular: TMDB_API.popular("movie"),
    trending: TMDB_API.trending("movie"),
    now_playing: TMDB_API.now_playing,
    upcoming: TMDB_API.upcoming,
  };

  return (
    <div className="home-page">
      <div className="btn-container flex justify-end gap-5">
        <button
          onClick={() => setSwitchContent(true)}
          className={switchContent ? "open-show selected" : "open-show"}
        >
          Movies
        </button>
        <button
          onClick={() => setSwitchContent(false)}
          className={switchContent ? "open-show " : "open-show selected"}
        >
          Tv Shows
        </button>
      </div>
      {switchContent ? (
        <div className=" movies-container">
          <ShowSection
            API={MOVIEAPIS.popular}
            header={"Popular"}
            type={"movie"}
          />
          <ShowSection
            API={MOVIEAPIS.trending}
            header={"Trending"}
            type={"movie"}
          />
          <ShowSection
            API={MOVIEAPIS.now_playing}
            header={"Now Playing"}
            type={"movie"}
          />
          <ShowSection
            API={MOVIEAPIS.upcoming}
            header={"Upcoming"}
            type={"movie"}
          />
        </div>
      ) : (
        <div className="tvs-container">
          <ShowSection API={TVAPIS.popular} header={"Popular"} type={"tv"} />
          <ShowSection API={TVAPIS.trending} header={"Trending"} type={"tv"} />
          <ShowSection
            API={TVAPIS.airing_today}
            header={"Airing Today"}
            type={"tv"}
          />
          <ShowSection
            API={TVAPIS.on_the_air}
            header={"Upcoming in 7 days"}
            type={"tv"}
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;
