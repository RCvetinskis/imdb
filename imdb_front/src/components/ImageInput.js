import React, { useState } from "react";

const ImageInput = ({
  setInputData,
  inputData,
  name,
  setImagePreview,
  setErrorMsg,
}) => {
  const [urlInputValue, setUrlInputValue] = useState("");
  const handleChange = (e) => {
    const { name, files, value } = e.target;

    if (files && files.length > 0) {
      const file = files[0];
      const isImage = file.type.startsWith("image");

      if (isImage) {
        const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
        const fileSizeInBytes = file.size;

        if (fileSizeInBytes > maxSizeInBytes) {
          setErrorMsg("File size exceeds 10 MB limit.");
          setImagePreview("");
          setUrlInputValue("");
          return;
        }
        const reader = new FileReader();

        reader.onloadend = () => {
          setImagePreview(reader.result);
          setInputData({
            ...inputData,
            [name]: reader.result,
          });
        };
        setErrorMsg("");
        setUrlInputValue("");
        reader.readAsDataURL(file);
      } else {
        setErrorMsg("file should be image");
        setImagePreview("");
        setUrlInputValue("");
      }
    } else if (value) {
      const imageRegex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;
      if (!value.match(imageRegex)) {
        setErrorMsg("url should be image");
      } else {
        setErrorMsg("");
        setImagePreview(value);
        setUrlInputValue(value);
        setInputData({
          ...inputData,
          [name]: value,
        });
      }
    } else {
      removeImage();
    }
  };
  const removeImage = () => {
    setImagePreview("");
    setUrlInputValue("");
    setInputData({
      ...inputData,
      [name]: "",
    });
  };
  return (
    <div className="image-input-container">
      <div className="inputs-container">
        <div className="file-container">
          <label htmlFor="file" className="file-input-label">
            Choose file
          </label>
          <input
            type="file"
            accept="image/*"
            name={name}
            id="file"
            onChange={handleChange}
            className="file-input"
          />
          <i onClick={removeImage} className="fa-solid fa-x"></i>
        </div>
        <div className="url-container">
          <input
            className="acc-input"
            type="url"
            name={name}
            onChange={handleChange}
            placeholder="Image url"
            value={urlInputValue}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageInput;
