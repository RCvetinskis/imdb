import React, { useState } from "react";

const ImageInput = ({ setInputData, inputData, name, setImagePreview }) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];
      const isImage = file.type.startsWith("image");

      if (isImage) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImagePreview(reader.result);
          setInputData({
            ...inputData,
            [name]: reader.result,
          });
        };

        reader.readAsDataURL(file);
      } else {
        setImagePreview(value);
        setInputData({
          ...inputData,
          [name]: value,
        });
      }
    }
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
        </div>
        <div className="url-container">
          <input
            className="acc-input"
            type="url"
            name={name}
            onChange={handleChange}
            placeholder="Image url"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageInput;
