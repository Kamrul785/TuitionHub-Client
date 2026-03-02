import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                TH
              </div>
              <span className="font-semibold text-white text-lg">TuitionHub</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Personalized learning, trusted tutors, and clear progress tracking  all in one place.
            </p>
          </div>

          <div className="space-y-3">
            <h6 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Explore</h6>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-slate-400 hover:text-white transition-colors">Home</Link>
              <Link to="/tuitions" className="text-sm text-slate-400 hover:text-white transition-colors">Browse Tuitions</Link>
              <Link to="/how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">How It Works</Link>
              <Link to="/faq" className="text-sm text-slate-400 hover:text-white transition-colors">FAQs</Link>
            </div>
          </div>

          <div className="space-y-3">
            <h6 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Get Started</h6>
            <div className="flex flex-col gap-2">
              <Link to="/register" className="text-sm text-slate-400 hover:text-white transition-colors">Register</Link>
              <Link to="/login" className="text-sm text-slate-400 hover:text-white transition-colors">Login</Link>
              <Link to="/about" className="text-sm text-slate-400 hover:text-white transition-colors">About</Link>
              <a href="mailto:support@tuitionhub.com" className="text-sm text-slate-400 hover:text-white transition-colors">Contact Support</a>
            </div>
          </div>

          <div className="space-y-3">
            <h6 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stay Updated</h6>
            <p className="text-sm text-slate-400">Get tips, study guides, and tutor spotlights.</p>
            <div className="flex">
              <input
                type="email"
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-l-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="you@email.com"
                aria-label="Email"
              />
              <button
                type="button"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-r-lg transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} TuitionHub. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-slate-300 transition-colors">About</Link>
            <Link to="/how-it-works" className="hover:text-slate-300 transition-colors">How It Works</Link>
            <Link to="/faq" className="hover:text-slate-300 transition-colors">FAQs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
