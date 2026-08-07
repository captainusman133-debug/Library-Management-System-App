const Book = require("../models/BookModel");
const User = require("../models/UserModel");
const Category = require("../models/CategoryModel");
const LibraryRecord = require("../models/LibraryRecordModel");

const normalizeStatus = (status) => (status ? status.toLowerCase() : "");

const getDashboard = async (req, res) => {
    try {
        const totalBooks = await Book.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalCategories = await Category.countDocuments();
        const records = await LibraryRecord.find({}, { status: 1 });

        const borrowedBooks = records.filter((record) => normalizeStatus(record.status) === "borrowed").length;
        const returnedBooks = records.filter((record) => normalizeStatus(record.status) === "returned").length;

        res.status(200).json({
            success: true,
            dashboard: {
                totalBooks,
                totalUsers,
                totalCategories,
                borrowedBooks,
                returnedBooks,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getDashboard,
};