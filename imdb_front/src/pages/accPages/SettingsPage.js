import React, { useContext, useState, useEffect } from "react";
import UserCard from "../../components/account/UserCard";
import mainContext from "../../context/MainContext";
import Input from "../../components/Input";
import ImageInput from "../../components/ImageInput";
import ErrorMsg from "../../components/account/ErrorMsg";

const SettingsPage = () => {
  const { user } = useContext(mainContext);
  const [inputData, setInputData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="account-page ">
      <div className="user-card-container">
        <UserCard user={user} imagePreview={imagePreview} />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form ">
          <Input
            inputData={inputData}
            setInputData={setInputData}
            type="email"
            placeholder="Email"
            name="email"
          />
          <Input
            inputData={inputData}
            setInputData={setInputData}
            type="username"
            placeholder="Username"
            name="username"
          />
          <Input
            inputData={inputData}
            setInputData={setInputData}
            type="password"
            placeholder="Password"
            name="password"
          />
          <Input
            inputData={inputData}
            setInputData={setInputData}
            type={"password"}
            placeholder={"Repeat Password"}
            name="confirmPassword"
          />
          <ImageInput
            name={"avatar"}
            inputData={inputData}
            setInputData={setInputData}
            setImagePreview={setImagePreview}
          />
          <button type="submit" className="settings-btn">
            Save Changes
          </button>
        </form>
        <div className="error-container text-center mt-3">
          <ErrorMsg
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
            type="settings"
            data={inputData}
            setIsFormValid={setIsFormValid}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
