module.exports = (session_user) => {
  const user = {
    username: session_user.username,
    avatar: session_user.avatar,
    email: session_user.email,
    _id: session_user._id,
    likes: session_user.likes,
    dislikes: session_user.dislikes,
    already_seen: session_user.already_seen,
  };
  return user;
};
