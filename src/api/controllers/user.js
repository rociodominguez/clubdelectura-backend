const bcrypt = require('bcrypt');
const User = require("../models/user");
const generateKey = require('../../utils/jwt');

const register = async (req, res, next) => {
    try {
        const duplicatedUser = await User.findOne({ userName: req.body.userName });

        if (duplicatedUser) {
            return res.status(400).json("Nombre de usuario ya existente");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
            rol: "user"
        });

        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(400).json({ error: "Error al registrar usuario", message: error.message });
    }
}

const login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).json("Usuario no encontrado");
        }

        if (bcrypt.compareSync(password, user.password)) {
            const token = generateKey(user._id);
            return res.status(200).json({token, user})
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
        return res.status(400).json({ error: "Error al eliminar usuario", message: error.message });
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ error: "Error al obtener usuarios", message: error.message });
    }
}

const getUsersById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json("Usuario no encontrado");
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json("Error al obtener usuario por ID");
    }
}

const updateUser = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(400).json({ error: "Error al actualizar usuario", message: error.message });
    }
}

module.exports = { login, register, deleteUser, getUsers, getUsersById, updateUser };
