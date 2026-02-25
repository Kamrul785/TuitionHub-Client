import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-auto border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                TH
              </div>
              <div>
                <p className="font-bold text-lg">TuitionHub</p>
                <p className="text-sm text-slate-600">Connecting students with quality tutors.</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Personalized learning, trusted tutors, and clear progress tracking—all in one place.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h6 className="footer-title">Explore</h6>
            <Link to="/" className="link link-hover">Home</Link>
            <Link to="/tuitions" className="link link-hover">Browse Tuitions</Link>
            <Link to="/how-it-works" className="link link-hover">How It Works</Link>
            <Link to="/faq" className="link link-hover">FAQs</Link>
          </div>

          <div className="flex flex-col gap-2">
            <h6 className="footer-title">Get Started</h6>
            <Link to="/register" className="link link-hover">Register</Link>
            <Link to="/login" className="link link-hover">Login</Link>
            <Link to="/about" className="link link-hover">About</Link>
            <a href="mailto:support@tuitionhub.com" className="link link-hover">Contact Support</a>
          </div>

          <div className="flex flex-col gap-2">
            <h6 className="footer-title">Stay Updated</h6>
            <p className="text-sm text-slate-600">Get tips, study guides, and tutor spotlights.</p>
            <form className="form-control">
              <div className="join">
                <input
                  type="email"
                  className="input input-bordered join-item input-sm"
                  placeholder="Email"
                  aria-label="Email"
                />
                <button type="button" className="btn btn-primary btn-sm join-item">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-base-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-600">
          <span>© {new Date().getFullYear()} TuitionHub. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/about" className="link link-hover">About</Link>
            <Link to="/how-it-works" className="link link-hover">How It Works</Link>
            <Link to="/faq" className="link link-hover">FAQs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;