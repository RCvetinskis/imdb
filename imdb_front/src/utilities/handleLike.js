import axios from "axios";
import { SERVER_API } from "./APIS";
import { throttle } from "lodash";
const handleLike = throttle(
  async (userId, showId, category, likeType, setUser, getLength) => {
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
          setUser(response.data.data);
          getLength(showId, category);
        }
      })
      .catch((error) => console.log(error));
  },
  1000
);

export { handleLike };
