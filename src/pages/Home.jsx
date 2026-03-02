import React from "react";
import { FiHome, FiAward, FiBookOpen, FiZap } from "react-icons/fi";
import Hero from "../components/Home/Hero";
import FeatureProduct from "../components/Home/FeatureProduct";
import State from "../components/Home/State";
import Work from "../components/Home/Work";
import Categories from "../components/Categories/Categories";
import CTA from "../components/Home/CTA";

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <State />
      <FeatureProduct />
      <Work />
      <Categories />
      <CTA />

      {/* Trust Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-2">
            Trusted Partners
          </p>
          <h3 className="text-lg font-semibold text-slate-700">
            Backed by leading educational institutions
          </h3>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Bepza High School", icon: FiHome },
              { name: "Metro University", icon: FiAward },
              { name: "City College", icon: FiBookOpen },
              { name: "CP Academy", icon: FiZap },
            ].map((org) => (
              <div
                key={org.name}
                className="group flex flex-col items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-6 shadow-sm transition-all hover:shadow-md hover:border-indigo-100 hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                  <org.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-sm font-semibold text-slate-600 group-hover:text-indigo-600 transition-colors">
                  {org.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
