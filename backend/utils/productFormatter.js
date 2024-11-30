// utils/productFormatter.js

const formatProduct = (product) => {
    return {
      ...product.toObject(), // Convert Mongoose document to plain object
      image: `http://localhost:3000/uploads/${product.image}` // Add full image URL
    };
  };
  
  module.exports = { formatProduct };
  