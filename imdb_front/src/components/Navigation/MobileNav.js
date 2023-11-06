import React from "react";
const MobileNav = ({
  defaultOptions,
  handleNav,
  currentLocation,
  user,
  setAccMenuIsOpen,
}) => {
  return (
    <ul className="nav-mobile">
      {defaultOptions.map((item, index) => (
        <li
          onClick={() => handleNav(item)}
          className={`${
            currentLocation.pathname + currentLocation.search === item.path
              ? "nav-selected nav-li"
              : "nav-li"
          } `}
          key={index}
        >
          {item.option === "Account" ? (
            <div className="user-nav" onClick={() => setAccMenuIsOpen(true)}>
              <img src={user.avatar} alt=" user avatar" />
              <span> {item.option}</span>
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

export default MobileNav;
