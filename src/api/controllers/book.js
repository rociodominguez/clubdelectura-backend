const Book = require("../models/book");

const postBook = async (req, res, next) => {
    try {
        const newBook = new Book(req.body);

        // if(req.user.rol === "admin") {
        //     newBook.verified = true;
        // } else {
        //     newBook.verified = false;
        // }

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
        const bookUpdated = await Book.findByIdAndUpdate(id, newBook, { new: true });
        return res.status(200).json(bookUpdated);
    } catch (error) {
        return res.status(400).json("Error en PUT");
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const bookDeleted = await Book.findByIdAndDelete(id);
        return res.status(200).json(bookDeleted);
    } catch (error) {
        return res.status(400).json("Error en DELETE");
    }
};

module.exports = { getBooks, getBookById, postBook, updateBook, deleteBook };