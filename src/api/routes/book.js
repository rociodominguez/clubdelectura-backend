const { isAuth } = require("../../middlewares/auth");
const { getBookById, getBooks, postBook, updateBook, deleteBook } = require("../controllers/book");

const bookRouter = require("express").Router();

bookRouter.put("/:id", [isAuth], updateBook);
bookRouter.delete("/:id", [isAuth], deleteBook);
bookRouter.get("/:id", getBookById);
bookRouter.get("/", getBooks);
bookRouter.post("/", [isAuth], postBook);

module.exports = bookRouter;