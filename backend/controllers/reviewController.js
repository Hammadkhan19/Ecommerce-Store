// controllers/reviewController.js
const Review = require("../models/review");
const Product = require("../models/products"); // Adjust the path as necessary

// Create a new review
module.exports.create_review = async (req, res) => {
  const { productId, userId, rating, comment } = req.body;


  // Log to check if the request body is received
  console.log("Request Body:", req.body);

  // Log to check if userId is received
  console.log("User ID:", userId);


  try {
    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
  // Check if the user has already reviewed this product
  const existingReview = product.reviews.find(
    (review) => review.userId && review.userId.toString() === userId
  );

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product." });
    }

    // Create a new review object
    const newReview = {
      userId,
      rating,
      comment,
    };

    // Add the new review to the product's reviews array
    product.reviews.push(newReview);

    // Update the number of reviews
    product.numReviews = product.reviews.length;

    // Calculate the new average rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    // Save the updated product
    await product.save();

    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating review" });
  }
};

// Get all reviews for a specific product
module.exports.get_reviewsByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ productId }).populate(
      "userId",
      "username"
    ); // Assuming the User model has a username field
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

// Update a review
module.exports.update_review = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, comment },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review updated successfully", review: updatedReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating review" });
  }
};

// Delete a review
module.exports.delete_review = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting review" });
  }
};
