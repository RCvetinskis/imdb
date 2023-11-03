import axios from "axios";
import { SERVER_API } from "./APIS";
const handleLike = (userId, show, category, likeType, setUser) => {
  axios
    .post(likeType === "like" ? SERVER_API.like : SERVER_API.dislike, {
      userId,
      show,
      category,
    })
    .then((response) => {
      if (response.data.error) {
        console.log(response.data.message);
      } else {
        setUser(response.data.data);
      }
    })
    .catch((error) => console.log(error));
};

export { handleLike };
