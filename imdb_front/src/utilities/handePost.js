import axios from "axios";
import { throttle } from "lodash";
const handePost = throttle(
  async (
    API,
    commentObject,
    setComment,
    socket,
    switchToComment,
    toggleReplyInput
  ) => {
    await axios
      .post(API, commentObject)
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.message);
        } else {
          if (API.includes("reply")) {
            socket.emit("reply-comments", response.data.data);
            toggleReplyInput(null);
            switchToComment(response.data.data._id);
          } else {
            socket.emit("comments", response.data.data);
          }
          setComment({
            ...commentObject,
            comment: "",
          });
        }
      })
      .catch((error) => console.log(error));
  },
  1000
);
export { handePost };
