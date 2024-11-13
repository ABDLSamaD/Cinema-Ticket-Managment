// import React from 'react'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import DashHome from "./DashHome";
import DashNav from "./DashNav";
import DashMovies from "./DashMovies";
import DashFoodDrinks from "./DashFoodDrinks";
import DashSetting from "./DashSetting";
// import Home from "../Menu/Home";

const DashMenu = () => {
  const auth = localStorage.getItem("userInfo");
  // If not authenticated, redirect to home page
  if (!auth) {
    return <Navigate to="/" />;
  }
  return (
    // <>
    //   {auth ? (
    <>
      <DashNav />
      <Routes>
        <Route path="/dashHome" element={<DashHome />} />
        <Route path="/dashMovie" element={<DashMovies />} />
        <Route path="/dashfoodrinks" element={<DashFoodDrinks />} />
        <Route path="/dashsetting" element={<DashSetting />} />
      </Routes>
    </>
    //   ) : (
    //     <div
    //       className="container"
    //       style={{
    //         position: "relative",
    //         top: "10rem",
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //         flexDirection: "column",
    //         margin: "auto",
    //         minHeight: "40vh",
    //         width: "50%",
    //       }}
    //     >
    //       <h1
    //         style={{
    //           marginBottom: "1em",
    //           color: "#ddf",
    //           letterSpacing: "2px",
    //           fontSize: "3vw",
    //           fontWeight: "300",
    //         }}
    //       >
    //         Login to Continue
    //       </h1>
    //       <button>
    //         <Link to="/signin" style={{ color: "#ddf" }}>
    //           Login
    //         </Link>
    //       </button>
    //     </div>
    //   )}
    // </>
  );
};

export default DashMenu;
