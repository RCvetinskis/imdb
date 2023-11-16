import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { TMDB_API } from "../utilities/APIS";

const useGenres = (type, media_type) => {
  const [genres, setGenres] = useState([]);
  const getGenres = useCallback(async () => {
    try {
      const { data } = await axios.get(
        TMDB_API.genres(type ? type : media_type)
      );
      setGenres(data.genres);
    } catch (error) {
      console.log(error);
    }
  }, [type, media_type]);

  useEffect(() => {
    getGenres();
  }, [getGenres]);
  return genres;
};

export default useGenres;
