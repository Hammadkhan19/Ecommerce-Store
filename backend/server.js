require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/reviews");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/category");
const upload = require("./middlewares/upload");
require("./db/db");
const app = express();
const port = 3000;

app.use(cors({
  
  origin: "https://latistore.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.post("/upload", upload.single("image"), (req, res) => {
  try {
    // Access the file URL from Cloudinary
    const fileUrl = req.file.path;
    res
      .status(200)
      .json({ message: "Image uploaded successfully", url: fileUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
});
app.get("/", (req, res) => {
  res.status(200).send("Backend is running successfully.");
});

app.use(express.json());
// Static folder for uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use(authRoutes);
app.use(reviewRoutes);
app.use(productRoutes);
app.use(categoryRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
