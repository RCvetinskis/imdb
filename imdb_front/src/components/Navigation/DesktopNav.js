import React from "react";
import SearchBar from "../SearchBar";
const DesktopNav = ({
  defaultOptions,
  handleNav,
  currentLocation,
  user,
  setAccMenuIsOpen,
}) => {
  return (
    <ul className="flex justify-between p-5 nav">
      <SearchBar />
      {defaultOptions.map((item, index) => (
        <li
          key={index}
          onClick={() => handleNav(item)}
          className={`${
            currentLocation.pathname === item.path
              ? "nav-selected nav-li"
              : "nav-li"
          } `}
        >
          {item.option === "Account" ? (
            <div
              className="nav-item-acc"
              onClick={() => setAccMenuIsOpen(true)}
            >
              <img
                width={34}
                height={34}
                src={user.avatar}
                alt=" user avatar"
              />
            </div>
          ) : (
            <div>
              {" "}
              <i className={`${item.className} p-2 `}></i>
              {item.option}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default DesktopNav;
