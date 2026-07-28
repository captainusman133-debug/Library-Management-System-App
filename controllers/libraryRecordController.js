const Book = require("../models/BookModel");
const User = require("../models/UserModel");
const LibraryRecord = require("../models/LibraryRecordModel");

// Borrow Book
const borrowBook = async (req, res) => {
  try {
    const { userId, bookId, dueDate } = req.body;

    // Check if user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if book exists
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check available copies
    if (book.availableCopies <= 0) {
      return res.status(400).json({
        success: false,
        message: "Book is not available",
      });
    }

    // Reduce available copies
    book.availableCopies -= 1;
    await book.save();

    // Create borrow record
    const record = await LibraryRecord.create({
      user: userId,
      book: bookId,
      dueDate,
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
    const { recordId } = req.body;

    // Find borrow record
    const record = await LibraryRecord.findById(recordId);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Borrow record not found",
      });
    }

    // Check if already returned
    if (record.status === "Returned") {
      return res.status(400).json({
        success: false,
        message: "Book has already been returned",
      });
    }

    // Find the book
    const book = await Book.findById(record.book);

    // Increase available copies
    book.availableCopies += 1;
    await book.save();

    // Update record
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
      .populate("user", "name email")
      .populate("book", "title author isbn");


    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });


  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  borrowBook,
  returnBook,
  getBorrowHistory
};