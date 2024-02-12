const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    img: { type: String, required: true }
}, {
    timestamps: true,
    collection: "books"
});

const Book = mongoose.model("books", bookSchema, "books");
module.exports = Book;