import React, { useRef } from "react";
import { handleLike } from "../../utilities/handleLike";
import ReactStars from "react-rating-stars-component";
import { SERVER_API } from "../../utilities/APIS";
import axios from "axios";
const UserAdjustment = ({ user, show, type, setUser }) => {
  const commentRef = useRef();

  const handleRating = (value) => {};
  const handleComment = () => {
    axios
      .post(SERVER_API.comment, {
        comment: commentRef.current.value,
        username: user.username,
        userId: user._id,
        avatar: user.avatar[0],
        category: type,
        show,
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.message);
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => console.log(error));
    commentRef.current.value = "";
  };
  return (
    <div className="seasons-container">
      <div className="input-container">
        <textarea
          ref={commentRef}
          name="comment"
          placeholder="comment"
        ></textarea>
        <ReactStars
          count={10}
          onChange={handleRating}
          size={16}
          isHalf={false}
          activeColor="#ffd700"
        />
        <button onClick={handleComment} className="season-btn">
          Submit
        </button>
      </div>

      <div className="btns-container">
        <button
          onClick={() => handleLike(user._id, show, type, "like", setUser)}
          className="season-btn"
        >
          Like
        </button>
        <button
          onClick={() => handleLike(user._id, show, type, "dislike", setUser)}
          className="season-btn"
        >
          Dislike
        </button>
      </div>
    </div>
  );
};

export default UserAdjustment;
