import React, { useState, useEffect, useContext, useRef } from "react";
import { SERVER_API } from "../utilities/APIS";
import axios from "axios";
import Comment from "./Comment";
import ReplyComments from "./ReplyComments";
import mainContext from "../context/MainContext";
import UserInterButtons from "./UserInterButtons";
const Comments = ({ user, type, show }) => {
  const { socket } = useContext(mainContext);
  const [getComments, setGetComments] = useState([]);
  const [getReplyComments, setGetReplyComments] = useState([]);
  const [openReplies, setOpenReplies] = useState({});
  const [selectedCommentForReply, setSelectedCommentForReply] = useState(null);
  const commentsContainerRef = useRef(null);

  // display replays length
  const loadComments = async () => {
    if (show.id) {
      await axios
        .get(SERVER_API.get_comments, {
          params: {
            showId: show.id,
            category: type,
          },
        })
        .then((response) => {
          if (response.data.error) {
          } else {
            setGetComments(response.data.data);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    loadComments();
    socket.on("new-comments", (newComments) => {
      setGetComments(newComments);
      scrollToBottom();
    });
  }, [socket, show, type, openReplies]);

  const scrollToBottom = () => {
    const container = commentsContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [getComments]);

  const toggleReplies = (commentId) => {
    setOpenReplies((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const switchToComment = (newCommentId) => {
    const previouslyOpenComment = Object.keys(openReplies).find(
      (commentId) => openReplies[commentId]
    );

    if (previouslyOpenComment) {
      toggleReplies(previouslyOpenComment);
    }

    if (previouslyOpenComment === newCommentId) {
      toggleReplies(newCommentId, false);
    }
    toggleReplies(newCommentId);
  };
  const toggleReplyInput = (commentId) => {
    if (selectedCommentForReply === commentId) {
      setSelectedCommentForReply(null);
    } else {
      setSelectedCommentForReply(commentId);
    }
  };

  return (
    <div className="comments-container">
      <div id="comments" className="comments" ref={commentsContainerRef}>
        {getComments.map((comment) => (
          <div key={comment._id} className="comment-container">
            <div className="user-container">
              <img
                src={comment.user.avatar}
                alt={`Image of ${comment.user.username}`}
              />
              <p className="username">{comment.user.username}</p>
            </div>{" "}
            <p className="comment">{comment.comment}</p>
            <UserInterButtons
              comment={comment}
              switchToComment={switchToComment}
              openReplies={openReplies}
              toggleReplyInput={toggleReplyInput}
            />
            {openReplies[comment._id] && (
              <ReplyComments
                SERVER_API={SERVER_API}
                getReplyComments={getReplyComments}
                setGetReplyComments={setGetReplyComments}
                comment={comment}
                type={type}
                show={show}
                socket={socket}
              />
            )}
            {selectedCommentForReply === comment._id ? (
              <Comment
                type="reply"
                category={type}
                commentId={comment._id}
                replyingToId={comment.user.userId}
                show={show}
                user={user}
                setGetComments={setGetReplyComments}
                SERVER_API={SERVER_API}
                getReplyComments={getReplyComments}
                socket={socket}
                switchToComment={switchToComment}
                toggleReplyInput={toggleReplyInput}
              />
            ) : null}
          </div>
        ))}
      </div>
      <Comment
        type={"comment"}
        category={type}
        show={show}
        user={user}
        setGetComments={setGetComments}
        SERVER_API={SERVER_API}
        getReplyComments={getReplyComments}
        socket={socket}
      />
    </div>
  );
};

export default Comments;
