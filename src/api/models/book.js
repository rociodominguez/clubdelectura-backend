const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    img: { type: String, required: true },
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
    readingStatus: { type: String, enum: ["actual", "acabada"], default: "actual" },
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
