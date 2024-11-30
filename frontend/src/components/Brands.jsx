import React from "react";
import { Link } from "react-router-dom";

// Sample brand data
const brands = [
  {
    name: "Nike",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a6/Nike_logo.svg",
  },
  {
    name: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_Logo.svg",
  },
  {
    name: "Puma",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Puma_Logo.svg",
  },
  {
    name: "Under Armour",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/38/Under_Armour_logo.svg",
  },
  {
    name: "Reebok",
    logo: "https://upload.wikimedia.org/wikipedia/en/1/1a/Reebok_logo.svg",
  },
  {
    name: "Levi's",
    logo: "https://upload.wikimedia.org/wikipedia/en/4/4f/Levis_Logo.svg",
  },
];

const BrandsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-black mb-10">
        Our Trusted Brands
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="h-16 mb-4"
            />
            <h2 className="text-xl font-semibold text-center">{brand.name}</h2>
            <Link
              to={`/${brand.name.toLowerCase()}`}
              className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
            >
              Shop Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsPage;
