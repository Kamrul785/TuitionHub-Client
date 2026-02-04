import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-auto">
      <div className="footer p-10 max-w-7xl mx-auto flex justify-around">
        {/* About Section */}
        <aside>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <div>
            <p className="font-bold text-lg">TuitionHub</p>
            <p className="text-sm">
              Connecting students with quality tutors
              <br />
              since 2025
            </p>
          </div>
        </aside>

        {/* Quick Links */}
        <nav>
          <h6 className="footer-title">Platform</h6>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/tuitions" className="link link-hover">
            Browse Tuitions
          </Link>
          <Link to="/about" className="link link-hover">
            About Us
          </Link>
          <Link to="/contact" className="link link-hover">
            Contact
          </Link>
        </nav>

        {/* For Users */}
        <nav>
          <h6 className="footer-title">Resources</h6>
          <Link to="/how-it-works" className="link link-hover">
            How It Works
          </Link>
          <Link to="/faq" className="link link-hover">
            FAQs
          </Link>
          <Link to="/become-tutor" className="link link-hover">
            Become a Tutor
          </Link>
          <Link to="/support" className="link link-hover">
            Support
          </Link>
        </nav>

        {/* Legal */}
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link to="/terms" className="link link-hover">
            Terms of Service
          </Link>
          <Link to="/privacy" className="link link-hover">
            Privacy Policy
          </Link>
          <Link to="/cookies" className="link link-hover">
            Cookie Policy
          </Link>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by
            TuitionHub
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;