import React, { useEffect } from "react";

const ErrorMsg = ({ data, setIsFormValid, type, errorMsg, setErrorMsg }) => {
  const emailValidRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const loginErrorMsg = {
    email: "Email adress is not valid",
    username: "Username min length 5",
    password: "Password min length 5",
    confirmPassword: "Password should match",
    serverSide: "User not found",
  };

  useEffect(() => {
    if (type === "login") {
      if (!data.email.match(emailValidRegex)) {
        setIsFormValid(false);
        setErrorMsg(loginErrorMsg.email);
      } else if (data.password.length <= 4) {
        setIsFormValid(false);
        setErrorMsg(loginErrorMsg.password);
      } else {
        setIsFormValid(true);
        setErrorMsg("");
      }
    } else if (type === "register") {
      if (!data.email.match(emailValidRegex)) {
        setIsFormValid(false);
        setErrorMsg(loginErrorMsg.email);
      } else if (data.password.length <= 4) {
        setIsFormValid(false);
        setErrorMsg(loginErrorMsg.password);
      } else if (data.password !== data.confirmPassword) {
        setIsFormValid(false);
        setErrorMsg(loginErrorMsg.confirmPassword);
      } else if (data.username.length <= 4) {
        setIsFormValid(false);
        setErrorMsg(loginErrorMsg.username);
      } else {
        setIsFormValid(true);
        setErrorMsg("");
      }
    }
  }, [data]);

  return <div className="error  text-red-500">{errorMsg}</div>;
};

export default ErrorMsg;
