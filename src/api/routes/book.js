const { isAuth } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getBookById, getBooks, postBook, updateBook, deleteBook, rateBook } = require("../controllers/book");

const bookRouter = require("express").Router();

bookRouter.post("/:id/vote", [isAuth], rateBook);
bookRouter.put("/:id", [isAuth], updateBook);
bookRouter.delete("/:id", [isAuth], deleteBook);
bookRouter.get("/:id", getBookById);
bookRouter.post("/", [isAuth], upload.single("img"), postBook);
bookRouter.get("/", getBooks);

module.exports = bookRouter;