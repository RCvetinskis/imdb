import React from "react";

const UserCard = ({ user, imagePreview }) => {
  return (
    <div className="user-card">
      <div className="img-container">
        <img
          src={imagePreview ? imagePreview : user.avatar}
          alt={user.username}
        />
      </div>
      <div className="text-container">
        <p>
          Username: <span>{user.username}</span>
        </p>
        <p>
          Email: <span>{user.email}</span>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
