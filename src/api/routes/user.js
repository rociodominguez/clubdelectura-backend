const { isAuth } = require("../../middlewares/auth");
const { getUsers, login, updateUser, deleteUser, register } = require("../controllers/user");

const userRouter = require("express").Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.put("/:id", [isAuth], updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/", getUsers);

module.exports = userRouter;

