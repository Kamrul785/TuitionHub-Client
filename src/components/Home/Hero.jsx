import React from "react";
import { Link } from "react-router";
import heroImage from "../../assets/hero_img.png";
import BlurText from "../Animations/BlurText";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const Hero = () => {
  return (
    <div className="hero min-h-[600px] bg-gray-100 from-blue-50 to-indigo-100">
      <div className="hero-content flex-col-reverse md:flex-row text-center md:text-left gap-10">
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800 mb-6">
            Find Your Perfect <span className="text-blue-600">Tutor</span>
          </h1>
          <div className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 mt-5">
            <BlurText
              text="Connect with experienced tutors for personalized learning. Browse hundreds of tuitions across all subjects and classes."
              delay={200}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-lg sm:text-xl md:text-2xl mb-8"
            />
          </div>
          <div className="flex gap-4 justify-center md:justify-start flex-wrap">
            <Link to="/tuitions" className="btn btn-primary btn-lg">
              Browse Tuitions
            </Link>
            <Link to="/register" className="btn btn-outline btn-lg">
              Get Started
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={heroImage}
            alt="Hero"
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-6 md:mt-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
