import React, { useState, useEffect } from "react";
import { handleLike } from "../../utilities/handleLike";
import ReactStars from "react-rating-stars-component";
import { SERVER_API } from "../../utilities/APIS";
import { handePost } from "../../utilities/handePost";
import axios from "axios";
const UserAdjustment = ({ user, show, type, setUser }) => {
  const [getLikesLength, setLikesLength] = useState(null);
  const alreadyRated = (object) => {
    const data = user[object].category[type].find(
      (showId) => showId === show.id
    );
    if (data) {
      return data;
    } else {
      return null;
    }
  };
  const getLength = async (showId, category) => {
    await axios
      .get(SERVER_API.show_like_length, {
        params: {
          showId,
          category,
        },
      })
      .then((response) => {
        if (!response.data.error) {
          setLikesLength(response.data.data);
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getLength(show.id, type);
  }, [show, type]);

  return (
    <>
      {/* <ReactStars
        count={10}
        onChange={(rating) =>
          handePost(SERVER_API.rate, {
            rating,
            userId: user._id,
            category: type,
            show,
          })
        }
        size={16}
        isHalf={false}
        activeColor="#fca311"
      /> */}

      <div className="btns-container">
        <div>
          <button
            disabled={alreadyRated("likes") ? true : false}
            style={
              alreadyRated("likes")
                ? { color: "#fca311", pointerEvents: "none" }
                : { color: "#eee" }
            }
            onClick={() => {
              handleLike(user._id, show.id, type, "like", setUser, getLength);
            }}
            className="btn-like "
          >
            <i className="fa-solid fa-thumbs-up"></i>
          </button>
          <span>{getLikesLength?.likes}</span>
        </div>
        <div>
          <button
            disabled={alreadyRated("dislikes") ? true : false}
            style={
              alreadyRated("dislikes")
                ? { color: "#9b2226", pointerEvents: "none" }
                : { color: "#eee" }
            }
            onClick={() => {
              handleLike(
                user._id,
                show.id,
                type,
                "dislike",
                setUser,
                getLength
              );
            }}
            className="btn-like "
          >
            <i className="fa-solid fa-thumbs-down"></i>
          </button>
          <span>{getLikesLength?.dislikes}</span>
        </div>
      </div>
    </>
  );
};

export default UserAdjustment;
