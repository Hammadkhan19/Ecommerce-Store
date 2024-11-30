const { Router } = require("express");
const CategoryController = require("../controllers/categoryController");

const router = Router();

// Route for adding a category (POST)
router.post("/categories", CategoryController.create_category);

// Route for getting all categories (GET)
router.get("/categories", CategoryController.get_categories);

// Route for updating a category by id (PUT)
router.put("/categories/:id", CategoryController.update_category);

// Route for deleting a category by id (DELETE)
router.delete("/categories/:id", CategoryController.delete_category);

module.exports = router;
