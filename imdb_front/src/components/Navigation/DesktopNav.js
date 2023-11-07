import React from "react";

const DesktopNav = ({
  defaultOptions,
  handleNav,
  currentLocation,
  user,
  setAccMenuIsOpen,
}) => {
  return (
    <ul className="flex justify-between p-5 nav">
      {defaultOptions.map((item, index) => (
        <li
          key={index}
          onClick={() => handleNav(item)}
          className={`${
            currentLocation.pathname + currentLocation.search === item.path
              ? "selected nav-li"
              : "nav-li"
          } `}
        >
          {item.option === "Account" ? (
            <div
              className="nav-item-acc"
              onClick={() => setAccMenuIsOpen(true)}
            >
              <img
                style={{ borderRadius: "50%" }}
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
