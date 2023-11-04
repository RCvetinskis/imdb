import React, { useState, useEffect } from "react";
import Youtube from "react-youtube";
import { TMDB_API } from "../../utilities/APIS";
import axios from "axios";
const YoutubeModal = ({ type, id, bgImage, setOpenTrailer }) => {
  const [getVideoId, setVideoId] = useState(null);
  const fetchTrailer = async () => {
    await axios
      .get(TMDB_API.videos(type, id))
      .then(async (response) => {
        console.log(response.data);
        const youtubeData = response.data.results.find(
          (data) => data.type === "Trailer"
        );

        setVideoId(youtubeData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchTrailer();
  }, [type, id]);

  return (
    <div
      className="youtube-modal"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="close-button" onClick={() => setOpenTrailer(false)}>
        &times;
      </div>
      <div className="video-container">
        {getVideoId ? (
          <Youtube
            className="youtube-player"
            videoId={getVideoId.key}
            id={getVideoId.id}
          />
        ) : (
          <div>Video is not found</div>
        )}
      </div>
    </div>
  );
};

export default YoutubeModal;
