import React from "react";
import { Link } from "react-router";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import Hero from "../components/Home/Hero";
import FeatureProduct from "../components/Home/FeatureProduct";
import State from "../components/Home/State";
import Work from "../components/Home/Work";
import Categories from "../components/Categories/Categories";
import CTA from "../components/Home/CTA";

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <State />

      {/* Features Section */}
      <FeatureProduct />

      {/* How It Works Section */}
      <Work />

      {/* Categories Section */}
      <Categories />

      {/* CTA Section */}
      <CTA />

      {/* Trust Section */}
      <div className="py-12 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-600 font-semibold text-sm uppercase tracking-wide">Trusted By Leading Educational Institutions</p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-slate-400 font-semibold">Bepza High School</div>
            <div className="text-slate-400 font-semibold">Metro University</div>
            <div className="text-slate-400 font-semibold">City College</div>
            <div className="text-slate-400 font-semibold">CP Academy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
