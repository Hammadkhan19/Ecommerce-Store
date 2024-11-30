const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinaryConfig');

// Configure Multer to use CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce-products', // Cloudinary folder name
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allow only specific formats
  },
});

const upload = multer({ storage });

module.exports = upload;
