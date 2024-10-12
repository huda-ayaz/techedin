import React from "react";
import Navbar from "./components/Navbar";
import RightSidebar from "./components/RightSidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/5 bg-gray-100">
        <Navbar />
      </div>

      <div className="flex-grow p-6">{children}</div>

      <div className="w-1/5 bg-gray-100">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Layout;
