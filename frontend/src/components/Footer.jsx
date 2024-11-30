import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa"; // Social Media Icons
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si"; // Payment Icons
import logo from "../assets/logo.png"
const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black p-8 mt-[-20px]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between">
        {/* Left Section: Brand Logo, Slogan, and Social Media Icons */}
        <div className="flex flex-col space-y-4 lg:w-1/3">
          {/* Brand Logo */}
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Lati Clothings Logo"
              className="w-12 h-12"
            />
            <h1 className="font-bold text-2xl">Lati Clothings</h1>
          </div>

          {/* Slogan */}
          <p className="text-gray-600">
            Your success, our commitment. Empowering your fashion journey.
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 text-gray-600">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="hover:text-gray-800"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="hover:text-gray-800"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="hover:text-gray-800"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="hover:text-gray-800"
            >
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>

        {/* Right Section: Links */}
        <div className="flex flex-col lg:flex-row justify-between lg:w-2/3 mt-8 lg:mt-0 lg:ml-16">
          {/* Link Columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
            <div>
              <h3 className="font-semibold text-lg">Company</h3>
              <ul className="space-y-2 mt-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-800">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800">
                    Our Team
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Help</h3>
              <ul className="space-y-2 mt-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-800">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800">
                    Customer Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800">
                    Shipping & Delivery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800">
                    Return Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg">FAQ</h3>
              <ul className="space-y-2 mt-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-800">
                    Payment Methods
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800">
                    Order Tracking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800">
                    Product Care
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800">
                    How to Buy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Resources</h3>
              <ul className="space-y-2 mt-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-800">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800">
                    E-books
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800">
                    Case Studies
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 my-8" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center text-gray-600">
        {/* Left Section: Payment Methods */}
        <div className="flex space-x-4 mb-4 lg:mb-0">
          <SiVisa size={36} />
          <SiMastercard size={36} />
          <SiPaypal size={36} />
        </div>

        {/* Right Section: Footer Rights */}
        <p className="text-sm">
          &copy; 2024 Lati Clothings. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
