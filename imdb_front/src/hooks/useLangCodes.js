import React, { useEffect, useState } from "react";
import axios from "axios";
import { TMDB_API } from "../utilities/APIS";
const useLangCodes = () => {
  const [langCodes, setLangCodes] = useState([]);
  useEffect(() => {
    const getLangCodes = async () => {
      const { data } = await axios.get(TMDB_API.languageCodes);
      setLangCodes(data);
    };
    getLangCodes();
  }, []);

  return langCodes;
};

export default useLangCodes;
