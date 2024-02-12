const jwt = require("jsonwebtoken");

const generateKey = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {expiresIn: "30d"})
}

module.exports = generateKey;