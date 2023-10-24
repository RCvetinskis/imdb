import React from "react";
import SearchBar from "../SearchBar";
const MobileNav = ({
  defaultOptions,
  handleNav,
  currentLocation,
  user,
  setAccMenuIsOpen,
}) => {
  return (
    <ul className="nav-mobile flex flex-col  items-center justify-evenly">
      <SearchBar />
      {defaultOptions.map((item, index) => (
        <li
          onClick={() => handleNav(item)}
          className={`${
            currentLocation.pathname === item.path
              ? "nav-selected nav-li"
              : "nav-li"
          } `}
          key={index}
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
          {item.option}
        </li>
      ))}
    </ul>
  );
};

export default MobileNav;
