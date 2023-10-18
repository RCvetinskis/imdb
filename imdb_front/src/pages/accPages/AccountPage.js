import React, { useContext } from "react";
import UserCard from "../../components/account/UserCard";
import mainContext from "../../context/MoviesContext";
const AccountPage = () => {
  const { user } = useContext(mainContext);
  return (
    <div className="account-page">
      <UserCard user={user} />
    </div>
  );
};

export default AccountPage;
