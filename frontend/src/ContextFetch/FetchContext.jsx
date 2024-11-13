// import { useState } from "react";
import noteContext from "./noteContext";
const FetchContext = (props) => {
  const auth = localStorage.getItem("userInfo");
  const fetchUserData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `${JSON.parse(auth).authToken}`);
    const response = await fetch("http://localhost:4400/api/auth/getuser", {
      method: "POST",
      headers: myHeaders,
    });
    const data = await response.json();
    return data.user;
  };

  return (
    <noteContext.Provider value={{ fetchUserData }}>
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
    </noteContext.Provider>
  );
};

export default FetchContext;
