import React, { useContext, useState, useEffect } from "react";
import UserCard from "../../components/account/UserCard";
import mainContext from "../../context/MainContext";
import Input from "../../components/Input";
import ImageInput from "../../components/ImageInput";
import ErrorMsg from "../../components/account/ErrorMsg";
import { SERVER_API } from "../../utilities/APIS";
import axios from "axios";
const SettingsPage = () => {
  const { user, setUser, toast } = useContext(mainContext);
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
    const isEmpty = Object.values(inputData).every((value) => value === "");
    if (isEmpty) {
      setErrorMsg("no new values has been added");
    } else {
      if (isFormValid) {
        try {
          const { data } = await axios.put(
            SERVER_API.update_user,
            {
              email: inputData.email,
              username: inputData.username,
              password: inputData.password,
              avatar: inputData.avatar,
              userId: user._id,
            },
            { withCredentials: true }
          );
          if (data.error) {
            setErrorMsg(data.message);
          } else {
            setUser(data.data);
            toast.success(data.message);
          }
        } catch (error) {
          console.error("Failed to initialize user:", error);
        }
      }
    }
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
            autoComplete={"new-password"}
          />
          <Input
            inputData={inputData}
            setInputData={setInputData}
            type="username"
            placeholder="Username"
            name="username"
            autoComplete={"new-password"}
          />
          <Input
            inputData={inputData}
            setInputData={setInputData}
            type="password"
            placeholder="Password"
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
          <ImageInput
            name={"avatar"}
            inputData={inputData}
            setInputData={setInputData}
            setImagePreview={setImagePreview}
            setErrorMsg={setErrorMsg}
            autoComplete={"new-password"}
          />
          <button type="submit" className="settings-btn">
            Save Changes
          </button>
        </form>
        <div className="error-container w-full  inline-block  text-center ">
          <ErrorMsg
            data={inputData}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
            setIsFormValid={setIsFormValid}
            type={"settings"}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
