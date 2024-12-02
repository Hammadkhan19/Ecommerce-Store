import React, { useState, useEffect } from "react";
import {
  Pagination,
  Button,
  Slider,
  Card,
  CardBody,
  Image,
} from "@nextui-org/react";

import {
  FaStar,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Breadcrumb from "../Breadcrumb"

const ProductGrid = () => {
  // sidebar states
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [priceVisible, setPriceVisible] = useState(false);
  const [colorVisible, setColorVisible] = useState(false);
  const [sizeVisible, setSizeVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  // Toggle Sidebar Function
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  const Base_URL = import.meta.env.VITE_API_URL;
 
  // filter states
  const [filters, setFilters] = useState({
    colors: [],
    sizes: [],
    priceRange: [0, 1000], // e.g., min price and max price
    categories: [],
  });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch products data
  useEffect(() => {
    fetch(`${Base_URL}/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setIsPending(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsPending(false);
      });
  }, []);
  // Fetching categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${Base_URL}/categories`);
        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchCategories();
  }, []);

  // Calculate the current products based on the current page
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const applyFilters = async () => {
    const requestBody = {
      colors: filters.colors,
      sizes: filters.sizes,
      priceRange: filters.priceRange,
      categories: filters.categories,
    };
  
    console.log("Request Body:", requestBody); // Log the request body being sent
  
    try {
      const response = await fetch(`${Base_URL}products/filter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch filtered products");
      }
  
      const filteredProducts = await response.json();
      console.log("Filtered Products:", filteredProducts); // Log the filtered products
  
      if (filteredProducts.length === 0) {
        console.log("No products found for the selected filters."); // Log if no products found
      }
  
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      setError(error.message);
    }
  };
  
  // Filters handlers
  const handleColorChange = (color) => {
    setFilters((prevFilters) => {
      const isColorSelected = prevFilters.colors.includes(color);
      return {
        ...prevFilters,
        colors: isColorSelected
          ? prevFilters.colors.filter((c) => c !== color) // Deselect color
          : [...prevFilters.colors, color], // Select color
      };
    });
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  
    setFilters((prevFilters) => {
      const isSizeSelected = prevFilters.sizes.includes(size);
      const updatedSizes = isSizeSelected
        ? prevFilters.sizes.filter((s) => s !== size) // Deselect size
        : [...prevFilters.sizes, size]; // Select size
  
      console.log("Updated Sizes:", updatedSizes); // Log the updated sizes array
  
      return {
        ...prevFilters,
        sizes: updatedSizes,
      };
    });
  };
  
  const handlePriceChange = (newPriceRange) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: newPriceRange,
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setFilters((prevFilters) => {
      const isCategorySelected = prevFilters.categories.includes(categoryId);
      return {
        ...prevFilters,
        categories: isCategorySelected
          ? prevFilters.categories.filter((c) => c !== categoryId) // Deselect category
          : [...prevFilters.categories, categoryId], // Select category
      };
    });
  };

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Function to calculate average rating
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); // return average rating to one decimal place
  };

  return (
    
    <div className="flex flex-col lg:flex-row">
     
  {/* Filter Button - Visible on small/medium screens */}
  <div className=" flex justify-start lg:hidden">
        <Button
          auto
          shadow
          onClick={toggleSidebar}
          className="bg-gray-800 text-white flex items-center px-2 py-2 rounded-md"
        >
          <FaFilter className="mr-2" /> Filters
        </Button>
      </div>
      {/* Sidebar Container */}
      <div
        className={`sticky lg:relative lg:mx-8 inset-x-0 bottom-0 h-full lg:h-auto mt-4 lg:w-1/4 bg-gray-100 p-5 rounded-lg flex flex-col space-y-4 transition-transform transform ${
          isSidebarVisible ? "translate-y-0" : "translate-y-full"
        } lg:translate-y-0 lg:flex lg:items-start z-50 lg:z-auto max-h-screen lg:max-h-none overflow-y-auto lg:overflow-visible`}
      >
        
        {/* Close Button for Mobile View */}
        <div className="flex justify-between items-center lg:hidden">
          <h2 className="text-2xl font-semibold">Filters</h2>
          <FaTimes className="text-xl cursor-pointer" onClick={toggleSidebar} />
        </div>
        
        {/* Filters Heading */}
        <div className="hidden lg:flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Filters</h2>
          <FaFilter className="text-xl" />
        </div>

        <hr className="border-gray-300" />

        {/* category Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          {categories.map((cat) => (
            <div className="flex gap-2" key={cat._id}>
              <input
                type="checkbox"
                checked={filters.categories.includes(cat._id)}
                onChange={(e) => {
                  handleCategoryChange(cat._id); // Pass category ID
                }}
              />
              <label>{cat.name}</label>
            </div>
          ))}
        </div>

        <hr className="border-gray-300" />

        {/* Price Filter */}
        <div>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setPriceVisible(!priceVisible)}
          >
            <h3 className="text-lg font-semibold">Price</h3>
            {priceVisible ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown className="ml-1" />
            )}
          </div>
          {priceVisible && (
            <div className="mt-4">
              <Slider
                label="Price Range"
                step={50}
                minValue={0}
                maxValue={1000}
                defaultValue={filters.priceRange}
                onChange={handlePriceChange} // Call price change handler
                className="max-w-md"
              />
            </div>
          )}
        </div>

        <hr className="border-gray-300" />

        {/* Color Filter */}
        <div>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setColorVisible(!colorVisible)}
          >
            <h3 className="text-lg font-semibold">Color</h3>
            {colorVisible ? (
              <FaChevronUp />
            ) : (
              <FaChevronDown className="ml-1" />
            )}
          </div>
          {colorVisible && (
            <div className="flex justify-end justify-items-center gap-2 mt-2">
              {["red", "blue", "green", "yellow"].map((color) => (
                <div
                  key={color}
                  className={`w-7 h-7 rounded-full cursor-pointer border-2 ${
                    filters.colors.includes(color)
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          )}
        </div>
        <hr className="border-gray-300" />

        {/* Size Filter */}
        <div>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setSizeVisible(!sizeVisible)}
          >
            <h3 className="text-lg font-semibold">Size</h3>
            {sizeVisible ? <FaChevronUp /> : <FaChevronDown className="ml-1" />}
          </div>
          {sizeVisible && (
            <div className="flex gap-2 mt-2">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`border rounded-md px-4 py-2 mb-1 ${
                    selectedSize === size ? "bg-gray-300" : "bg-white"
                  }`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        <hr className="border-gray-300" />

        {/* Apply Filter Button */}
        <Button
          onClick={applyFilters}
          auto
          className="bg-black text-white w-full mt-4"
          shadow
          rounded
        >
          Apply Filters
        </Button>
      </div>

      {/* Overlay for Mobile View */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="w-full">
        {/* Top section with category name and number of results */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Products</h2>
          <div className="flex items-center mx-14">
            <span className="text-sm text-gray-600">
              {products.length} Results
            </span>
          </div>
        </div>

        {/* Products */}
        <Breadcrumb currentPage="Products" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
       
          {currentProducts.map((product) => {
            const averageRating = calculateAverageRating(product.reviews);
            const reviewCount = product.reviews ? product.reviews.length : 0;

            return (
              
              <Link key={product._id} to={`/products/${product._id}`}>
                
                <Card
                  isPressable
                  isHoverable
                  className="transition-none hover:scale-100 shadow-none lg:p-4"
                >
                  <CardBody className="p-4">
                    <Image
                      src={product.image} // Full image URL
                      alt={product.title}
                      className="rounded-lg flex justify-center justify-items-center"
                    />
                    <h3 className="font-semibold mt-2">{product.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center mt-1">
                      {/* Display the stars based on average rating */}
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < Math.round(averageRating)
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      {/* Show review count next to stars */}
                      <span className="sm:ml-2 mt-1 sm:mt-0 text-sm text-gray-500">
                        ({reviewCount} reviews)
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      ${product.price}
                    </p>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="flex mt-3 gap-5 justify-center">
          <p className="text-small text-default-500 mt-2">
            Selected Page: {currentPage}
          </p>
          <Pagination
            total={Math.ceil(products.length / itemsPerPage)}
            color="default"
            page={currentPage}
            onChange={handlePageChange}
          />
          <div className="flex gap-2">
            <Button
              className="bg-black text-white"
              size="sm"
              variant="flat"
              onPress={() =>
                setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
              }
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="flat"
              className="bg-black text-white"
              onPress={() =>
                setCurrentPage((prev) =>
                  prev < Math.ceil(products.length / itemsPerPage)
                    ? prev + 1
                    : prev
                )
              }
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
