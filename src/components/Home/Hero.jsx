import React from "react";
import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import heroImage from "../../assets/hero_img.png";
import BlurText from "../Animations/BlurText";
import ShinyText from "../Animations/ShinyText";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              Trusted by 50,000+ learners
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Find Your Perfect{" "}
              <ShinyText
                text="Tutor"
                color="#4f46e5"
                shineColor="#a5b4fc"
                speed={2}
                className="text-indigo-600"
              />
            </h1>

            <div className="mb-8">
              <BlurText
                text="Connect with experienced tutors for personalized learning. Browse hundreds of tuitions across all subjects and classes."
                delay={200}
                animateBy="words"
                direction="top"
                className="text-base sm:text-lg text-slate-600 leading-relaxed"
              />
            </div>

            <div className="flex gap-3 justify-center md:justify-start flex-wrap">
              <Link
                to="/tuitions"
                className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none px-6"
              >
                Browse Tuitions
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/register"
                className="btn btn-ghost border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 px-6"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src={heroImage}
              alt="TuitionHub - Find your perfect tutor"
              className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
