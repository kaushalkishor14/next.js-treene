import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

function FooterPage() {
  return (
    <footer className="footer w-full px-4 py-8 bg-gray-900 text-white mt-8">
      {/* Footer Container */}
      <div className="flex flex-col sm:flex-row justify-center items-center  sm:justify-around sm:items-start space-y-6 sm:space-y-0">
        {/* Top Section - Brand */}
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center space-x-2">
            <h1 className="text-orange-500 font-bold text-4xl">Tech</h1>
            <h1 className="font-bold text-4xl text-white">Trail</h1>
          </div>
        </div>

        {/* Center Section - Links */}
        <div className="flex flex-wrap justify-center space-x-4 text-sm font-semibold">
          <a
            href="/about"
            className="hover:text-orange-500 transition-colors duration-300"
          >
            About
          </a>
          <a
            href="/team"
            className="hover:text-orange-500 transition-colors duration-300"
          >
            Team
          </a>
          <a
            href="#"
            className="hover:text-orange-500 transition-colors duration-300"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-orange-500 transition-colors duration-300"
          >
            Terms & Conditions
          </a>
          <a
            href="#"
            className="hover:text-orange-500 transition-colors duration-300"
          >
            Policy
          </a>
          <a
            href="#"
            className="hover:text-orange-500 transition-colors duration-300"
          >
            Refund Policy
          </a>
          <a
            href="/contact"
            className="hover:text-orange-500 transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Social Media Icons Section */}
      <div className="flex justify-center space-x-4 mt-6">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-500 transition-colors duration-300"
        >
          <FaFacebookF size={24} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-500 transition-colors duration-300"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-500 transition-colors duration-300"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-500 transition-colors duration-300"
        >
          <FaLinkedinIn size={24} />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-500 transition-colors duration-300"
        >
          <FaYoutube size={24} />
        </a>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <p className="text-sm text-gray-400">
          &copy; 2024 TechTrail. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default FooterPage;
