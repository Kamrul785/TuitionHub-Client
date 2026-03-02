import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "../pages/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white ">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
