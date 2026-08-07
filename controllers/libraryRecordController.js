const Book = require("../models/BookModel");
const User = require("../models/UserModel");
const LibraryRecord = require("../models/LibraryRecordModel");

const normalizeStatus = (status) => (status ? status.toLowerCase() : "");

// Borrow Book
const borrowBook = async (req, res) => {
  try {
    const { userId, bookId, dueDate } = req.body;

    if (!userId || !bookId || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "User, book, and due date are required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({
        success: false,
        message: "Book is not available",
      });
    }

    book.availableCopies -= 1;
    await book.save();

    const record = await LibraryRecord.create({
      user: userId,
      book: bookId,
      dueDate,
      status: "Borrowed",
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Return Book
const returnBook = async (req, res) => {
  try {
    const recordId = req.params.id || req.body.recordId;

    if (!recordId) {
      return res.status(400).json({
        success: false,
        message: "Borrow record id is required",
      });
    }

    const record = await LibraryRecord.findById(recordId);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Borrow record not found",
      });
    }

    if (normalizeStatus(record.status) === "returned") {
      return res.status(400).json({
        success: false,
        message: "Book has already been returned",
      });
    }

    const book = await Book.findById(record.book);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    book.availableCopies += 1;
    await book.save();

    record.status = "Returned";
    record.returnDate = new Date();
    await record.save();

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Borrow History
const getBorrowHistory = async (req, res) => {
  try {
    const history = await LibraryRecord.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("book", "title author isbn");

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getBorrowHistory,
};