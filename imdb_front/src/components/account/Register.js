import React, { useState } from "react";
import Input from "../Input";
import ErrorMsg from "./ErrorMsg";
import axios from "axios";
import { SERVER_API } from "../../utilities/APIS";

const Register = ({
  setRegisterModal,
  showLogin,
  setShowLogin,
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

  const handleSubmit = async () => {
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
      <div className="form-modal-content">
        <i
          onClick={() => setShowLogin(!showLogin)}
          className="fa-solid fa-x"
        ></i>
        <div className="inputs-container">
          <Input
            inputData={inputData}
            setInputData={setInputData}
            type={"username"}
            placeholder={"username"}
            name="username"
          />
          <Input
            inputData={inputData}
            setInputData={setInputData}
            type={"email"}
            placeholder={"email"}
            name="email"
          />
          <Input
            inputData={inputData}
            setInputData={setInputData}
            type={"password"}
            placeholder={"password"}
            name="password"
          />
          <Input
            inputData={inputData}
            setInputData={setInputData}
            type={"password"}
            placeholder={"repeat password"}
            name="confirmPassword"
          />
          <ErrorMsg
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
            type={"register"}
            data={inputData}
            setIsFormValid={setIsFormValid}
          />
          <button onClick={handleSubmit} className="btn">
            Register
          </button>
        </div>

        <div className="btn-register-container">
          <h2>Already have an account?</h2>
          <button onClick={() => setRegisterModal(false)} className="btn">
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
