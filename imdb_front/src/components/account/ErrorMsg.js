import React, { useEffect } from "react";

const ErrorMsg = ({ data, setIsFormValid, type, errorMsg, setErrorMsg }) => {
  const emailValidRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const errorMessages = {
    email: "Email adress is not valid",
    username: "Username min length 5",
    password: "Password min length 5",
    confirmPassword: "Password should match",
  };

  useEffect(() => {
    function setError(errorObject) {
      if (!errorObject) {
        setIsFormValid(true);
        setErrorMsg("");
      } else {
        setIsFormValid(false);
        setErrorMsg(errorObject);
      }
    }

    if (type === "login") {
      if (!data.email.match(emailValidRegex)) {
        setError(errorMessages.email);
      } else if (data.password.length <= 4) {
        setError(errorMessages.password);
      } else {
        setError();
      }
    } else if (type === "register") {
      if (!data.email.match(emailValidRegex)) {
        setError(errorMessages.email);
      } else if (data.password.length <= 4) {
        setError(errorMessages.password);
      } else if (data.password !== data.confirmPassword) {
        setError(errorMessages.confirmPassword);
      } else if (data.username.length <= 4) {
        setError(errorMessages.username);
      } else {
        setError();
      }
    } else if (type === "settings") {
      if (data.username && data.username.length <= 4) {
        setError(errorMessages.username);
      } else if (data.email && !data.email.match(emailValidRegex)) {
        setError(errorMessages.email);
      } else if (
        data.password &&
        data.confirmPassword &&
        data.password.length <= 4
      ) {
        setError(errorMessages.password);
      } else if (data.password !== data.confirmPassword) {
        setError(errorMessages.confirmPassword);
      } else {
        setError();
      }
    }
  }, [data]);

  return <div className="error text-red-500 ">{errorMsg}</div>;
};

export default ErrorMsg;
