const Book = require("../models/book");

const postBook = async (req, res, next) => {
    try {
        const newBook = new Book(req.body);

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
}

const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newBook = req.body;
        delete newBook._id;
        const updatedBook = await Book.findByIdAndUpdate(id, newBook, { new: true });
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

const rateBook = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { rating } = req.body;
  
      if (rating < 0 || rating > 5) {
        return res.status(400).json("La puntuación debe ser entre 0 y 5");
      }
  
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { $push: { ratings: { user: req.user._id, rating: rating } } },
        { new: true }
      );
  
      return res.status(200).json(updatedBook);
    } catch (error) {
      return res.status(400).json("Error al puntuar el libro");
    }
  };

module.exports = { getBooks, getBookById, postBook, updateBook, deleteBook, rateBook };