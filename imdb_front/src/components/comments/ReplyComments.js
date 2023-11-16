import React, { useEffect } from "react";
import axios from "axios";
import UserInterButtons from "./UserInterButtons";
const ReplyComments = ({
  SERVER_API,
  getReplyComments,
  setGetReplyComments,
  comment,
  show,
  type,
  socket,
}) => {
  useEffect(() => {
    const fetchReplyComments = async () => {
      if (show.id) {
        await axios
          .get(SERVER_API.get_reply_comments, {
            params: {
              showId: show.id,
              category: type,
              commentId: comment._id,
            },
          })
          .then((response) => {
            if (response.data.error) {
            } else {
              setGetReplyComments(response.data.data);
            }
          })
          .catch((error) => console.log(error));
      }
    };
    fetchReplyComments();
  }, [show._id, type, comment._id]);

  useEffect(() => {
    socket.on("new-reply-comments", (newComments) => {
      setGetReplyComments(newComments);
    });
  }, [show._id, type, comment._id, socket, getReplyComments]);

  return (
    <div className="reply-comments">
      {getReplyComments.map((replyComment) =>
        replyComment.replying_to._id === comment._id ? (
          <div className="reply" key={replyComment._id}>
            <div className=" user-container">
              <img
                src={replyComment.user.avatar}
                alt={`Image of ${replyComment.user.username}`}
              />
              <p className="username">{replyComment.user.username}</p>
            </div>
            <p className="comment">{replyComment.comment}</p>
          </div>
        ) : null
      )}
    </div>
  );
};

export default ReplyComments;
