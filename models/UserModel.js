const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    role: {
      type: String,
      enum: ["Admin", "Librarian", "Student"],
      default: "Student",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);