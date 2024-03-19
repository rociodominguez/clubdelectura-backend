const Book = require("../models/book");
const Rating = require("../models/rating");

const postBook = async (req, res, next) => {
  try {
    const newBook = new Book(req.body);

    if (req.file) {
      newBook.img = req.file.path;
    }

    const bookSaved = await newBook.save();
    return res.status(200).json(bookSaved);
  } catch (error) {
    return res.status(400).json("Error en POST");
  }
};

const getBooks = async (req, res, next) => {
  try {
    const allBooks = await Book.find();
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(400).json("Error en GET");
  }
};

const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(400).json("Error en GET by ID");
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newBook = req.body;
    delete newBook._id;
    const updatedBook = await Book.findByIdAndUpdate(id, newBook, {
      new: true,
    });
    return res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(400).json("Error en PUT");
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    return res.status(200).json(deletedBook);
  } catch (error) {
    return res.status(400).json("Error en DELETE");
  }
};

const rateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const numericRating = parseInt(rating);

    const newRating = new Rating({
      book: id,
      user: req.user.id,
      rating: numericRating
    });

    await newRating.save();

    const book = await Book.findByIdAndUpdate(id, { $push: { ratings: newRating._id } }, { new: true });

    return res.status(200).json("Calificación agregada exitosamente");
  } catch (error) {
    console.error("Error al calificar el libro:", error);
    return res.status(500).json("Error interno del servidor");
  }
};


module.exports = {
  getBooks,
  getBookById,
  postBook,
  updateBook,
  deleteBook,
  rateBook
};
