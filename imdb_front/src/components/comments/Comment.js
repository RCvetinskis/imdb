import React, { useState } from "react";
import { handePost } from "../../utilities/handePost";

const Comment = ({
  show,
  user,
  type,
  SERVER_API,
  commentId,
  category,
  replyingToId,
  socket,
  switchToComment,
  toggleReplyInput,
}) => {
  const [comment, setComment] = useState({
    comment: "",
    userId: user._id,
    category: category,
    showId: show,
  });
  const [replyComment, setReplyComment] = useState({
    comment: "",
    commentId,
    userId: user._id,
    replyingToId: replyingToId ? replyingToId : null,
    category: category,
    showId: show,
  });

  return (
    <div className="comment-input-container">
      {type === "comment" ? (
        <>
          <textarea
            value={comment.comment}
            onChange={(e) =>
              setComment({
                ...comment,
                comment: e.target.value,
                showId: show.id,
                category: category,
                userId: user._id,
              })
            }
            name="comment"
            placeholder="comment"
          ></textarea>

          <button
            onClick={() =>
              handePost(SERVER_API.post_comment, comment, setComment, socket)
            }
            className="btn-comment"
          >
            <i className="fa-solid fa-paper-plane "></i>
          </button>
        </>
      ) : (
        <>
          <textarea
            value={replyComment.comment}
            onChange={(e) =>
              setReplyComment({
                ...replyComment,
                comment: e.target.value,
                showId: show.id,
                category: category,
                userId: user._id,
              })
            }
            name="comment"
            placeholder="comment"
          ></textarea>

          <button
            onClick={() =>
              handePost(
                SERVER_API.post_reply_comment,
                replyComment,
                setComment,
                socket,
                switchToComment,
                toggleReplyInput
              )
            }
            className="btn-comment"
          >
            <i className="fa-solid fa-paper-plane "></i>
          </button>
        </>
      )}
    </div>
  );
};

export default Comment;
