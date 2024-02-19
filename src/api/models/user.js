const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, required: true, default: "user", enum: ["admin", "user"]},
    favs: [{ type: mongoose.Types.ObjectId, required: false, ref: "books" }]
}, {
    timestamps: true,
    collection: "users"
});

userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model("User", userSchema, "users");
module.exports = User;