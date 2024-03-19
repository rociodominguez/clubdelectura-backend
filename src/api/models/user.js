const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    lastVoteMonth: { type: String },
    rol: { type: String, required: true, default: "user", enum: ["admin", "user"]},
    hasVoted: {
        type: Boolean,
        default: false,
      }
}, {
    timestamps: true,
    collection: "users"
});

userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model("User", userSchema, "users");
module.exports = User;