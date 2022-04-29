const mongoose = require("mongoose");
const { DB_URL, DB_CONFIG } = require("../db");

const Book = require("../models/Book.model");
const Author = require("../models/Author.model");

const booksArray = [
    {
        name : "The wonder down under",
        isbn: "978-1-68144-021-7",
        author: [],
    },    
];

const bookDocuments = booksArray.map((book) => new Book(book));
//TODO: erase console log
mongoose
    .connect(DB_URL, DB_CONFIG)
    .then(async () => {
        console.log("Executing seed Book");

        const allBooks = await Book.find();

        if (allBooks.length) {
            await Book.collection.drop();
            console.log("Book collection dropped");
        }
    })
    .catch((error) => {
        console.log("Error searching db: ", error);
    })
    .then(async () => {

        await Book.insertMany(bookDocuments);
        console.log("seed executed");
    })
    .catch((error) => {
        console.log("Error inserting books: ", error);
    })
    .finally(() => mongoose.disconnect());