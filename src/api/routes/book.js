const { getBookById, getBooks, postBook, updateBook, deleteBook } = require("../controllers/book");

const bookRouter = require("express").Router();

bookRouter.put("/:id", updateBook);
bookRouter.delete("/:id", deleteBook);
bookRouter.get("/:id", getBookById);
bookRouter.get("/", getBooks);
bookRouter.post("/", postBook);

module.exports = bookRouter;