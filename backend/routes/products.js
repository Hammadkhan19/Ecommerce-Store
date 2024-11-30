const { Router } = require("express");
const ProductController = require("../controllers/productsController");
const upload = require('../middlewares/upload');

const router = Router();

// Route for adding a product (POST)
router.post(
  "/addproduct",
  upload.single("image"),
  ProductController.create_product
);

// Route for getting all products (GET)
router.get("/products", ProductController.get_products);

// Route for getting product details by id (GET)
router.get("/products/:id", ProductController.get_productById);

// Route for getting filtered products (GET)
router.post("/products/filter", ProductController.filtered_products);

// Route for updating a product (PUT)
router.put("/products/:id", ProductController.update_Product);

// Route for deleting a product (DELETE)
router.delete("/products/:id", ProductController.delete_product);

module.exports = router;
