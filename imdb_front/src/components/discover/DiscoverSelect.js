import React from "react";
import Select from "react-select";
const DiscoverSelect = ({
  options,
  placeholder,
  callName,
  setSearchParams,
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

  const handleSelect = (selectedOption) => {
    setSearchParams(
      (prev) => {
        prev.set(callName, selectedOption);
        return prev;
      },
      { replace: true }
    );
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
