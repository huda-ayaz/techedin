import React from "react";
import Navbar from "./components/Navbar";
import RightSidebar from "./components/RightSidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex w-full h-screen">
      <div className="w-1/5 bg-[#1e2734]">
        <Navbar />
      </div>

      <div className="flex-grow bg-[#121b28]">{children}</div>

      <div className="w-1/5 bg-[#1e2734]">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Layout;
