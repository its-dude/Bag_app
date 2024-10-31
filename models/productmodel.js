const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema({
    image: {
        type: String,  // URL or file path to the product image
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0  // Discount in percentage
    },
    bgcolor: {
        type: String,  // Background color in hex, rgb, or color name
        required: true
    },
    textcolor: {
        type: String,  // Text color in hex, rgb, or color name
        required: true
    },
    panelcolor: {
        type: String,  // Panel color in hex, rgb, or color name
        required: true
    }
}, {
    timestamps: true  // Automatically adds `createdAt` and `updatedAt` fields
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
