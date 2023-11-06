import React from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_API } from "../../utilities/APIS";
import axios from "axios";
const AccNav = ({
  user,
  setUser,
  accMenuIsOpen,
  setAccMenuIsOpen,
  currentLocation,
}) => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    axios.get(SERVER_API.logout, { withCredentials: true }).then((response) => {
      if (response.data.response) {
        console.log(response.data.error);
      } else {
        setUser(null);
        navigate("/");
        setAccMenuIsOpen(false);
      }
    });
  };
  const accountOptions = [
    {
      option: "Account",
      path: null,
      className: "fa-solid fa-user",
      avatar: user ? user.avatar[0] : "",
      execute() {
        setAccMenuIsOpen(!accMenuIsOpen);
      },
    },
    {
      option: "Log Out",
      path: null,
      id: Math.random() * 100,
      className: "fa-solid fa-right-to-bracket",
      execute() {
        handleLogOut();
      },
    },
    {
      option: "Settings",
      path: "/Settings",
      className: "fa-solid fa-gear",
      execute() {
        navigate(this.path);
      },
    },
    {
      option: "Liked Movies",
      path: "/liked_movies",
      className: "fa-solid fa-film",
      execute() {
        navigate(this.path);
      },
    },
    {
      option: "Liked Shows",
      path: "/liked_shows",

      className: "fa-solid fa-tv",
      execute() {
        navigate(this.path);
      },
    },
    {
      option: "Already Seen",
      path: "/already_seen",
      className: "fa-solid fa-film",
      execute() {
        navigate(this.path);
      },
    },
  ];

  const handleAccNav = (item) => {
    item.execute();
    setAccMenuIsOpen(false);
  };

  return (
    <ul className="acc-nav flex flex-col  items-center justify-evenly">
      {accountOptions.map((item, index) => (
        <li
          className={`${
            currentLocation.pathname + currentLocation.search === item.path
              ? "nav-selected nav-li"
              : "nav-li"
          } `}
          key={index}
          onClick={() => handleAccNav(item)}
        >
          {item.option === "Account" ? (
            <button className="close-button">&times;</button>
          ) : (
            <> {item.option}</>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AccNav;
