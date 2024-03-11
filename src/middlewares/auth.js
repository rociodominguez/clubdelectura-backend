const User = require("../api/models/user");
const { verifyKey } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace("Bearer ", "");
    const { id } = verifyKey(parsedToken);
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json("Usuario no autorizado");
    }

    req.user = user;

    if (user.hasVoted) {
      return res.status(400).json("Usuario ya ha votado");
    }

    next();

  } catch (error) {
    return res.status(400).json("Usuario no autorizado");
  }
};

module.exports = { isAuth };