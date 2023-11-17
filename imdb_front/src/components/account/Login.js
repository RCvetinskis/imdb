import React, { useContext, useState } from "react";
import Input from "../Input";
import mainContext from "../../context/MainContext";
import Register from "./Register";
import ErrorMsg from "./ErrorMsg";
import { SERVER_API } from "../../utilities/APIS";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { openLogin, setOpenLogin } = useContext(mainContext);
  const [registerModal, setRegisterModal] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useContext(mainContext);
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      await axios
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
            setOpenLogin(false);
            nav("/Settings");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="form-modal-screen">
      <i onClick={() => setOpenLogin(!openLogin)} className="fa-solid fa-x"></i>
      {registerModal ? (
        <Register
          setRegisterModal={setRegisterModal}
          setIsFormValid={setIsFormValid}
          isFormValid={isFormValid}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
        />
      ) : (
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <Input
              inputData={inputData}
              setInputData={setInputData}
              type="email"
              placeholder="Email"
              name="email"
              autoComplete={"on"}
            />

            <Input
              inputData={inputData}
              setInputData={setInputData}
              type="password"
              placeholder="Password"
              name="password"
              autoComplete={"on"}
            />

            <button type="submit" className="form-btn">
              Login
            </button>
          </form>
          <div className="error-container">
            <ErrorMsg
              errorMsg={errorMsg}
              setErrorMsg={setErrorMsg}
              type="login"
              data={inputData}
              setIsFormValid={setIsFormValid}
            />
          </div>

          <footer className="form-footer">
            <p>Don't have an account?</p>
            <button onClick={() => setRegisterModal(true)} className="form-btn">
              Register
            </button>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Login;
