import React from "react";
import Hero from "../components/Home/Hero";
import FeatureProduct from "../components/Home/FeatureProduct";
import State from "../components/Home/State";
import Work from "../components/Home/work"
import Categories from "../components/categories/Categories";

const Home = () => {
  return (
    <div>
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
      <div className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of students and tutors on TuitionHub today
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/register"
              className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100"
            >
              Register as Student
            </a>
            <a
              href="/register"
              className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-blue-600"
            >
              Register as Tutor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
