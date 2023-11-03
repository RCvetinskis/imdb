const socket = require("socket.io");
module.exports = (http) => {
  const io = socket(http, { cors: { origin: "http://localhost:3000" } });

  io.on("connection", (socket) => {
    socket.on("comments", (comments) => {
      io.emit("new-comments", comments);
    });
    socket.on("reply-comments", (replyComments) => {
      io.emit("new-reply-comments", replyComments);
    });
  });
};
