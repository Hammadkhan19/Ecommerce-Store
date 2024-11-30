import React, { useState } from "react";
import { useSignup } from "../../hooks/Signup"; // Adjusted to follow naming conventions
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const UserSignup = () => {
  const [username, setUsername] = useState(""); // Initialize with an empty string
  const [email, setEmail] = useState(""); // Initialize with an empty string
  const [password, setPassword] = useState(""); // Initialize with an empty string
  const { signup, isLoading, error } = useSignup(); // Assuming useSignup is a custom hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h1>

        <label className="block text-gray-700 mb-2" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black mb-4"
          id="username"
        />

        <label className="block text-gray-700 mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black mb-4"
          id="email"
        />

        <label className="block text-gray-700 mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black mb-4"
          id="password"
        />

        <button
          disabled={isLoading}
          className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition duration-200"
        >
          {isLoading ? "Creating Account..." : "Signup"}
        </button>

        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserSignup;
