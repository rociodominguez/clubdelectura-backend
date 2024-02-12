const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, required: true, default: "user", enum: ["admin", "user"]},
    favs: {
        books: [{ type: mongoose.Types.ObjectId, ref: "Book" }],
        movies: [{ type: mongoose.Types.ObjectId, ref: "Movie" }]
    }
}, {
    timestamps: true,
    collection: "users"
});

userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, 10);
})

const User = mongoose.model("User", userSchema, "users");
module.exports = User;