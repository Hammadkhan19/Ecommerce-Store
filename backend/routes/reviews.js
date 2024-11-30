const { Router } = require("express");
const ReviewController = require("../controllers/reviewController");

const router = Router();

// Route for adding a review (POST)
router.post("/addreview", ReviewController.create_review);

// Route for deleting a review by id (DELETE)
router.delete("/reviews/:id", ReviewController.delete_review);

// Route for updating a review by id (PUT)
router.put("/reviews/:id", ReviewController.update_review);

// Route for getting reviews by product id (GET)
router.get("/products/:productId/reviews", ReviewController.get_reviewsByProductId);

module.exports = router;
