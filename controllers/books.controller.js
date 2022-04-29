const Book = require("../models/Book.model");


const booksGet = async (req, res) => {

	try {
		const books = await Book.find();
		return res.status(200).json(books);

	} catch (err) {
		return res.status(400).json(err);
	}
};

const bookGet =  async (req, res) => {

    try {
      const id = req.params.id;
      const selectedBook = await Book.findById(id);
      return res.status(200).json(selectedBook);
  
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
};

module.exports = {
    booksGet,
    bookGet,
};