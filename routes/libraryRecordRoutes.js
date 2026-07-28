const express = require("express");
const router = express.Router();
const {borrowBook, returnBook, getBorrowHistory} = require("../controllers/libraryRecordController");
// Borrow a Book
router.post("/borrow", borrowBook);
router.post("/return", returnBook);
router.put("/return/:id", returnBook);
router.get("/", getBorrowHistory);

module.exports = router;