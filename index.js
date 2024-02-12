const bookRouter = require("./src/api/routes/book");
const userRouter = require("./src/api/routes/user");
const { connectDB } = require("./src/config/db");
require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

connectDB();

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/users", userRouter);

app.use((req, res, next) => {
    return res.status(404).json("Not found! ❌");
});

app.listen(3000, () => {
    console.log("http://localhost:3000 ✅");
});
