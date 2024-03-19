const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateKey } = require("../../utils/jwt");

const register = async (req, res, next) => {
  try {
    const duplicatedUser = await User.findOne({ userName: req.body.userName });

    if (duplicatedUser) {
      return res.status(400).json("Nombre de usuario ya existente");
    }

    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      rol: "user",
      lastVoteMonth: getCurrentMonth()
    });

    const savedUser = await newUser.save();
    savedUser.password = null;
    return res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return res.status(400).json("Error al registrar usuario");
  }
};

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateKey(user._id);
      return res.status(200).json({ token, user });
    }

    return res.status(400).json("Usuario o contraseña incorrectos");
  } catch (error) {
    return res.status(400).json("Error al iniciar sesión");
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDeleted = await User.findByIdAndDelete(id);
    return res.status(200).json(userDeleted);
  } catch (error) {
    return res.status(400).json("Error al eliminar usuario");
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json("Error al obtener usuarios");
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() !== id) {
      return res.status(400).json("No autorizado");
    }

    const oldUser = await User.findById(id);
    const newUser = new User(req.body);
    newUser._id = id;
    newUser.favs = [...oldUser.favs, ...newUser.favs];
    const updatedUser = await User.findByIdAndUpdate(id, newUser, {
      new: true,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json("Error al actualizar usuario");
  }
};

const votesUser = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Usuario no encontrado.");
    }

    const canVote = canUserVote(user);
    if (canVote) {
      user.hasVoted = true;
      user.lastVoteMonth = getCurrentMonth();

      await user.save();
      return user;
    } else {
      throw new Error("El usuario ya ha votado este mes.");
    }
  } catch (error) {
    console.error(`Error en el voto del usuario: ${error.message}`);
  }
};

const canUserVote = (user) => {
  return !user.hasVoted || user.lastVoteMonth !== getCurrentMonth();
};

const getCurrentMonth = () => {
  const currentDate = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[currentDate.getMonth()];
};

module.exports = {
  login,
  register,
  deleteUser,
  getUsers,
  updateUser,
  votesUser
};
