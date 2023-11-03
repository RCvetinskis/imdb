import React from "react";

const UserInterButtons = ({
  comment,
  switchToComment,
  openReplies,
  toggleReplyInput,
}) => {
  // create logic for reply user of replied comment
  return (
    <div className="btns-container">
      <button className="btn">
        {" "}
        <i className="fa-solid fa-thumbs-up"></i>
      </button>
      <button className="btn">
        {" "}
        <i className="fa-solid fa-thumbs-down"></i>
      </button>

      <button
        disabled={comment.reply_comments.length === 0 ? true : false}
        onClick={() => switchToComment(comment._id)}
        className="btn"
      >
        {openReplies[comment._id]
          ? "Collapse"
          : `Replies (${comment.reply_comments.length})`}
      </button>
      <button onClick={() => toggleReplyInput(comment._id)} className="btn">
        <i className="fa-solid fa-reply"></i>
      </button>
    </div>
  );
};

export default UserInterButtons;
