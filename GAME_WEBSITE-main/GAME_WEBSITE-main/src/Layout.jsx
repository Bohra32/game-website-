import React from "react";
import { Outlet } from "react-router-dom";
import MyNavbar from "./components/Navbar";

const Layout = () => {
  return (
    <>
      <MyNavbar />
      <div style={{ marginTop: "80px" }}> {/* Adjust margin to prevent navbar overlap */}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
