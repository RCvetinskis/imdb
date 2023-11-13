import React, { useState, useEffect } from "react";
import axios from "axios";
import { TMDB_API } from "../utilities/APIS";

const useGenres = (type, media_type) => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const getGeneres = async () => {
      try {
        const { data } = await axios.get(
          TMDB_API.genres(type ? type : media_type)
        );
        setGenres(data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    getGeneres();
  }, [type, media_type]);
  return genres;
};

export default useGenres;
