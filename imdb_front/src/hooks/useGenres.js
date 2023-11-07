import React, { useState, useEffect } from "react";
import axios from "axios";
import { TMDB_API } from "../utilities/APIS";
const useGenres = (type, media_type) => {
  const [genres, setGenres] = useState([]);
  const getGeneres = async () => {
    await axios
      .get(TMDB_API.genres(type ? type : media_type))
      .then((response) => setGenres(response.data.genres))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getGeneres();
  }, [type]);
  return genres;
};

export default useGenres;
