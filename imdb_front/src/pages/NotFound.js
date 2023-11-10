import React from "react";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("./home");
  }, 1000);
  return <div>PAGE NOT FOUND</div>;
};

export default NotFound;
