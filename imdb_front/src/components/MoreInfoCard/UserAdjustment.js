import React from "react";
import { handleLike } from "../../utilities/handleLike";
import ReactStars from "react-rating-stars-component";
import { SERVER_API } from "../../utilities/APIS";
import axios from "axios";
import { throttle } from "lodash";

const UserAdjustment = ({ user, show, type, setUser, socket }) => {
  const handleSeen = throttle(async (userId, showId, category) => {
    await axios
      .post(
        SERVER_API.handle_show_seen,
        {
          userId,
          showId,
          category,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.message);
        } else {
          setUser(response.data.data);
        }
      })
      .catch((error) => console.error(error));
  }, 1000);

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
            disabled={show.already_liked ? true : false}
            style={
              show.already_liked
                ? { color: "#fca311", pointerEvents: "none" }
                : { color: "#eee" }
            }
            onClick={() => {
              handleLike(user._id, show.id, type, "like", setUser, socket);
            }}
            className="btn-like "
          >
            <i className="fa-solid fa-thumbs-up"></i>
          </button>
          <span>{show.likes_length}</span>
        </div>
        <div>
          <button
            disabled={show.already_disliked ? true : false}
            style={
              show.already_disliked
                ? { color: "#9b2226", pointerEvents: "none" }
                : { color: "#eee" }
            }
            onClick={() => {
              handleLike(user._id, show.id, type, "dislike", setUser, socket);
            }}
            className="btn-like "
          >
            <i className="fa-solid fa-thumbs-down"></i>
          </button>
          <span>{show.dislikes_length}</span>
        </div>

        <button
          onClick={() => handleSeen(user._id, show.id, type)}
          className="btn"
          style={show.already_seen ? { color: "#fca311" } : { color: "#eee" }}
        >
          <i className="fa-solid fa-eye"></i>
        </button>
      </div>
    </>
  );
};

export default UserAdjustment;
