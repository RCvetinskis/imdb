import React, { useState } from "react";
import Input from "../Input";
import ErrorMsg from "./ErrorMsg";
import axios from "axios";
import { SERVER_API } from "../../utilities/APIS";

const Register = ({
  setRegisterModal,
  setIsFormValid,
  isFormValid,
  errorMsg,
  setErrorMsg,
}) => {
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      await axios
        .post(SERVER_API.register, {
          username: inputData.username,
          email: inputData.email,
          password: inputData.password,
        })
        .then((response) => {
          if (response.data.error) {
            setErrorMsg(response.data.message);
          } else {
            setErrorMsg(response.data.message);
            setTimeout(() => {
              setRegisterModal(false);
            }, 1000);
          }
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <Input
            inputData={inputData}
            setInputData={setInputData}
            type={"username"}
            placeholder={"Username"}
            name="username"
            autoComplete={"new-password"}
          />
          <Input
            inputData={inputData}
            setInputData={setInputData}
            type={"email"}
            placeholder={"Email"}
            name="email"
            autoComplete={"new-password"}
          />
          <Input
            inputData={inputData}
            setInputData={setInputData}
            type={"password"}
            placeholder={"Password"}
            name="password"
            autoComplete={"new-password"}
          />
          <Input
            inputData={inputData}
            setInputData={setInputData}
            type={"password"}
            placeholder={"Repeat Password"}
            name="confirmPassword"
            autoComplete={"new-password"}
          />

          <button type="submit" className="form-btn">
            Register
          </button>
        </form>
        <div className="error-container">
          <ErrorMsg
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
            type="register"
            data={inputData}
            setIsFormValid={setIsFormValid}
          />
        </div>
        <footer className="form-footer">
          <p>Already have an accout?</p>
          <button onClick={() => setRegisterModal(false)} className="form-btn">
            Login
          </button>
        </footer>
      </div>
    </>
  );
};

export default Register;
