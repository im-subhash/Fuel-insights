import React from "react";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/NavBar.jsx";
const LayoutPage = () => {
  return (
    <div className=" bg-black">
      <Navbar/>
      <Outlet />
      {/* <Footer/> */}
    </div>
  );
};

export default LayoutPage;
