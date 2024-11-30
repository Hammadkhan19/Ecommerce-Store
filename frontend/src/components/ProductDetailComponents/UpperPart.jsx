import React, { useContext, useEffect, useState } from "react";
import { FaStar, FaMinus, FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        setProduct(data);
        setIsPending(false);
      } catch (err) {
        setError(err.message);
        setIsPending(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Handle quantity change
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select a size and color");
      return;
    }

    const productWithDetails = {
      ...product,
      quantity,
      color: selectedColor,
      size: selectedSize,
    };

    addToCart(productWithDetails);
  };

  const averageRating =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length || 0;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="flex flex-col lg:flex-row lg:space-x-12 space-y-8 lg:space-y-0">
        {/* Left Side: Image Preview */}
        <div className="flex lg:w-2/5 space-y-4 space-x-4">
          <div className="flex-1">
  
            <img
              src={product.image}
              alt="Product"
              className="w-full h-96 object-cover border rounded-lg"
            />
          </div>
        </div>

        {/* Right Side: Product Information */}
        <div className="lg:w-3/5 flex flex-col space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

          <div className="flex items-center space-x-2">
            <div className="flex space-x-1 text-yellow-500">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={
                    index < Math.round(averageRating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <p className="text-gray-600">{product.reviews.length} reviews</p>
          </div>

          <div className="text-2xl font-semibold">
            <span className="text-black ">${product.price}</span>
          </div>

          <p className="text-gray-600">{product.description}</p>

          {/* Color Selection */}
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold">Color:</h3>
            <div className="flex space-x-2">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                    selectedColor === color
                      ? "ring-2 ring-gray-800 border-gray-800"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold">Size:</h3>
            <div className="flex space-x-2">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded-lg cursor-pointer ${
                    selectedSize === size
                      ? "bg-gray-800 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold">Quantity:</h3>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 bg-gray-300 rounded-full"
                onClick={decreaseQuantity}
              >
                <FaMinus />
              </button>
              <span className="px-4 py-2 border rounded-lg">{quantity}</span>
              <button
                className="px-3 py-1 bg-gray-300 rounded-full"
                onClick={increaseQuantity}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-black text-white font-semibold rounded-lg mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
