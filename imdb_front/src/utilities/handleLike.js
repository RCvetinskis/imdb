import axios from "axios";
import { SERVER_API } from "./APIS";
import { throttle } from "lodash";
const handleLike = throttle(
  async (userId, showId, category, likeType, setUser, socket) => {
    await axios
      .post(
        likeType === "like"
          ? SERVER_API.handle_show_like
          : SERVER_API.handle_show_dislike,
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
          setUser((prevUser) => {
            const updatedUser = { ...prevUser, ...response.data.data };
            socket.emit("handle_likes", updatedUser);
            return updatedUser;
          });
        }
      })
      .catch((error) => console.log(error));
  },
  1000
);

export { handleLike };
