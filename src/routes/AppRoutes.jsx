import React from "react";
import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import MainLayout from "../Layout/MainLayout";
import Products from "../components/Products/Products";
import Tuition from "../components/Tuitions/Tuition";
import TuitionDetails from "../components/Tuitions/TuitionDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/tuitions" element={<Tuition />} />
        <Route path="/tuitions/:id" element={<TuitionDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
