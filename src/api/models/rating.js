const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: true });

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;