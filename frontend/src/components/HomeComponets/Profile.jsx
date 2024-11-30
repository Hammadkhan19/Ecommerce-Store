import React, { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const { user, dispatch } = useContext(AuthContext); // Get user and logout function from context
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const handleLoginAsGuest = () => {
    dispatch({ type: "LOGIN_AS_GUEST" });
    setIsOpen(false);
  };
  const handleClickOutside = (event) => {
    if (toggleRef.current && !toggleRef.current.contains(event.target)) {
      setIsOpen(false); // Close the toggle when clicking outside
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the toggle
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={toggleRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-1 p-2 bg-gray-200 rounded-full"
      >
        <FaUser size={24} className="text-black" />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white shadow-md rounded-lg z-10">
          <div className="p-4 border-b">
            {user ? (
              <>
                <p className="font-medium text-gray-700">{user.email}</p>
                <button
                  onClick={handleLogout}
                  className="mt-2 w-full text-left text-red-600 hover:bg-red-100 p-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-blue-600 hover:bg-blue-100 p-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <button
                  onClick={handleLoginAsGuest}
                  className="w-full text-left p-2 text-gray-800 hover:bg-gray-100"
                >
                  Login as Guest
                </button>
              </>
            )}
          </div>
          <div className="p-4">
            <Link
              to="/cart"
              className="block text-gray-800 hover:bg-gray-100 p-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              View Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
