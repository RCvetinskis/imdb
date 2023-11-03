import React, { useContext, useState } from "react";
import Input from "../Input";
import mainContext from "../../context/MainContext";
import Register from "./Register";
import ErrorMsg from "./ErrorMsg";
import { SERVER_API } from "../../utilities/APIS";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { showLogin, setShowLogin } = useContext(mainContext);
  const [registerModal, setRegisterModal] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    stayOn: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useContext(mainContext);
  const nav = useNavigate();
  const handleSubmit = async () => {
    if (isFormValid) {
      axios
        .post(
          SERVER_API.login,
          {
            email: inputData.email,
            password: inputData.password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data.error) {
            setErrorMsg(response.data.message);
          } else {
            setUser(response.data.data);
            setShowLogin(false);
            nav("/Settings");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="form-modal-container">
      {registerModal ? (
        <Register
          setRegisterModal={setRegisterModal}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          isFormValid={isFormValid}
          setIsFormValid={setIsFormValid}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
        />
      ) : (
        <div className="form-modal-content">
          <i
            onClick={() => setShowLogin(!showLogin)}
            className="fa-solid fa-x"
          ></i>
          <div className="inputs-container">
            <Input
              inputData={inputData}
              setInputData={setInputData}
              type="email"
              placeholder="email"
              name="email"
            />

            <Input
              inputData={inputData}
              setInputData={setInputData}
              type="password"
              placeholder="password"
              name="password"
            />
            <ErrorMsg
              errorMsg={errorMsg}
              setErrorMsg={setErrorMsg}
              type="login"
              data={inputData}
              setIsFormValid={setIsFormValid}
            />

            <div className="input-check-container">
              <Input
                inputData={inputData}
                setInputData={setInputData}
                type="checkbox"
                placeholder="Remember me"
                name={"stayOn"}
              />
            </div>

            <button onClick={handleSubmit} className="btn">
              Login
            </button>
          </div>

          <div className="btn-register-container">
            <h2>Don't have an account?</h2>
            <button onClick={() => setRegisterModal(true)} className="btn">
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
