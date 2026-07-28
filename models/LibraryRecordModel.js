const mongoose = require("mongoose");

const libraryRecordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    issueDate: {
      type: Date,
      default: Date.now,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    returnDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["Borrowed", "Returned"],
      default: "Borrowed",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LibraryRecord", libraryRecordSchema);