const { getUsers, getUsersById, login, updateUser, deleteUser, register } = require("../controllers/user");

const userRouter = require("express").Router();

userRouter.get("/:id", getUsersById);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/", getUsers);

module.exports = userRouter;
