const express = require("express");

const router = express.Router();

const {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

// POST /books
router.post("/", addBook);

// GET /books
router.get("/", getAllBooks);

// GET /books/:id
router.get("/:id", getBookById);

// PUT /books/:id
router.put("/:id", updateBook);

// DELETE /books/:id
router.delete("/:id", deleteBook);

module.exports = router;