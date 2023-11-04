import React, { useState } from "react";
import { handleLike } from "../../utilities/handleLike";
import ReactStars from "react-rating-stars-component";
import { SERVER_API } from "../../utilities/APIS";
import { handePost } from "../../utilities/handePost";
const UserAdjustment = ({ user, show, type, setUser }) => {
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
              handleLike(user._id, show.id, type, "like", setUser);
            }}
            className="btn-like "
          >
            <i className="fa-solid fa-thumbs-up"></i>
          </button>
          <span>{show.likes?.length}</span>
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
              handleLike(user._id, show.id, type, "dislike", setUser);
            }}
            className="btn-like "
          >
            <i className="fa-solid fa-thumbs-down"></i>
          </button>
          <span>{show.dislikes?.length}</span>
        </div>
      </div>
    </>
  );
};

export default UserAdjustment;
