const mongoose =require("mongoose");
const bookSchema = new mongoose.Schema (
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type : String,
            required: true,
            trim: true
        },
        isbn: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 0
        },
        availableCopies :{
            type: Number,
            required: true,
            min: 0
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Book", bookSchema);