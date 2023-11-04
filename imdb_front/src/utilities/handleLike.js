import axios from "axios";
import { SERVER_API } from "./APIS";
import { throttle } from "lodash";
const handleLike = throttle((userId, showId, category, likeType, setUser) => {
  axios
    .post(
      likeType === "like" ? SERVER_API.like : SERVER_API.dislike,
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
      }
    })
    .catch((error) => console.log(error));
}, 1000);

export { handleLike };
