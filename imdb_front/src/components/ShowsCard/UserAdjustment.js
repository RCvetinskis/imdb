import React, { useState } from "react";
import { handleLike } from "../../utilities/handleLike";
import ReactStars from "react-rating-stars-component";
import { SERVER_API } from "../../utilities/APIS";
import { handePost } from "../../utilities/handePost";
const UserAdjustment = ({ user, show, type, setUser }) => {
  return (
    <>
      <ReactStars
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
      />

      <div className="btns-container">
        <button
          onClick={() => handleLike(user._id, show, type, "like", setUser)}
          className="btn-like "
        >
          <i className="fa-solid fa-thumbs-up"></i>
        </button>
        <button
          onClick={() => handleLike(user._id, show, type, "dislike", setUser)}
          className="btn-like "
        >
          <i className="fa-solid fa-thumbs-down"></i>
        </button>
      </div>
    </>
  );
};

export default UserAdjustment;
