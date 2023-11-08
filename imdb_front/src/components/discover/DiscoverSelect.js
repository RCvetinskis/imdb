import React from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
const DiscoverSelect = ({
  options,
  pathname,
  placeholder,
  apiParams,
  setApiParams,
  callName,
}) => {
  const customStyles = {
    control: (base) => ({
      ...base,

      background: "black",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    menuList: (base) => ({
      ...base,
      background: "black",
    }),
  };
  const nav = useNavigate();
  const handleSelect = (selectedOption) => {
    const updatedParams = { ...apiParams };
    updatedParams[callName] = selectedOption;

    setApiParams(updatedParams);
    // Construct the new URL based on the updated params
    const query = Object.entries(updatedParams)
      .map(([param, value]) => `${param}=${value}`)
      .filter((param) => param !== "")
      .join("&");

    const newURL = `${pathname}?${query}`;
    nav(newURL);
  };

  return (
    <div className="select-container w-[200px]">
      <Select
        placeholder={placeholder}
        onChange={(selectedOption) => handleSelect(selectedOption.value)}
        options={options}
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          ...theme,

          colors: {
            ...theme.colors,
            primary25: "#14213d77",
            primary: "#fca311",
          },
        })}
      />
    </div>
  );
};

export default DiscoverSelect;
