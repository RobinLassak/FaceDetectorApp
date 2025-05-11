import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    console.log(toggleSidebar);
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div className="d-flex">
      {sidebarVisible && (
        <div className={`d-md-block ${sidebarVisible ? "" : "d-none"}`}>
          <Sidebar />
        </div>
      )}
      <div className="flex-grow-1 d-flex flex-column">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-grow-1 p-4 text-center">
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Layout;
