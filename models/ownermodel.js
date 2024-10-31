const mongoose = require('mongoose');

// Define the Owner Schema
const ownerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String,  // This could be a URL to the owner's picture
        default: null
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'  // Reference to the Product model
        }
    ]
}, {
    timestamps: true  // Automatically adds `createdAt` and `updatedAt` fields
});

// Create the Owner model
const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
