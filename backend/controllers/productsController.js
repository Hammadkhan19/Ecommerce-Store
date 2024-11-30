const Product = require("../models/products");
const upload = require("../middlewares/upload");
// Create a new product
module.exports.create_product = async (req, res) => {
  // Destructure the required fields from the request body
  const { title, description, price, category } = req.body;

  // Parse colors and sizes from JSON strings
  const colors = req.body.colors ? JSON.parse(req.body.colors) : [];
  const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];

  // Get the image path from the uploaded file
  const image = req.file ? req.file.filename : null;

  try {
    // Create a new product instance
    const product = new Product({
      title,
      description,
      price,
      colors,
      sizes,
      image: `https:/${req.file.path.split("/").slice(1).join("/")}`,
    });
    console.log("Image Path:", req.file.path);
    console.log(
      "Full Image URL:",
      `https://res.cloudinary.com/dc69xtdeu/image/upload/${image}`
    );

    // Save the product to the database
    await product.save();

    // Respond with the created product and its image URL
    res.status(201).json({
      message: "Product created",
      product,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products
module.exports.get_products = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("reviews.userId");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get filtered products based on the provided criteria
module.exports.filtered_products = async (req, res) => {
  try {
    const filters = req.body; // Get the filters from the request body
    const query = {};

    // Build the query based on the filters
    if (filters.colors && filters.colors.length) {
      query.colors = { $in: filters.colors }; // Match products with the selected colors
    }
    if (filters.sizes && filters.sizes.length) {
      query.sizes = { $in: filters.sizes }; // Match products with the selected sizes
    }
    if (filters.priceRange) {
      query.price = {
        $gte: filters.priceRange[0], // Minimum price
        $lte: filters.priceRange[1], // Maximum price
      };
    }
    if (filters.categories && filters.categories.length) {
      query.category = { $in: filters.categories }; // Match products with the selected categories
    }

    // Fetch products based on the built query
    const filteredProducts = await Product.find(query)
      .populate("category")
      .populate("reviews.userId");

    res.json(filteredProducts); // Send the filtered products back to the client
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific product by ID
module.exports.get_productById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("reviews.userId");

    if (!product) return res.status(404).json({ message: "Product not found" });

    // Add full image URL to the product
    res.json({
      ...product.toObject(),
      image: `http://localhost:3000/uploads/${product.image}`, // Add image URL
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
module.exports.update_Product = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
module.exports.delete_product = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
