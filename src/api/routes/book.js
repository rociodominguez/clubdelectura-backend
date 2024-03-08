const { isAuth } = require("../../middlewares/auth");
const { getBookById, getBooks, postBook, updateBook, deleteBook, rateBook } = require("../controllers/book");

const bookRouter = require("express").Router();

bookRouter.put("/:id", [isAuth], updateBook);
bookRouter.delete("/:id", [isAuth], deleteBook);
bookRouter.get("/:id", getBookById);
bookRouter.post("/", [isAuth], postBook);
bookRouter.post("/:id/rate", [isAuth], rateBook);
bookRouter.get("/", getBooks);

module.exports = bookRouter;