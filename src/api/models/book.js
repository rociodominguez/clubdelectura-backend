const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  img: { type: String, required: true },
  ratings: [
    {
      user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
      rating: { type: Number, required: true, min: 0, max: 5 },
    },
  ],
  readingStatus: { type: String, enum: ["actual", "acabada"], default: "acabada" },
}, {
  timestamps: true,
  collection: "books",
});

const Book = mongoose.model("Book", bookSchema, "books");
module.exports = Book;
