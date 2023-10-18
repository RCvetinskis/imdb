import React from "react";

const Input = ({ type, placeholder, inputData, setInputData, name }) => {
  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <label htmlFor={placeholder}>{placeholder}</label>
      <input
        onChange={handleChange}
        className="custom-input"
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
