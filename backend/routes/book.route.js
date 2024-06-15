import express from "express";
import { Book } from "../models/book.model.js";

const router = express.Router();

// create book
router.post("/", async (req, res) => {
  try {
    const title = req.body.title;
    const author = req.body.author;
    const publishYear = req.body.publishYear;

    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Send all the required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title,
      author,
      publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// read/get one book (with it's id)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).send({ message: "Book Not Found!" });
    }

    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// read/get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
    });
  }
});

// update book
router.put("/:id", async (req, res) => {
  try {
    const title = req.body.title;
    const author = req.body.author;
    const publishYear = req.body.publishYear;

    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Send all the required fields: title, author, publishYear",
      });
    }

    const { id } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(id, req.body);

    if (!updatedBook) {
      return res.status(404).send({ message: "Book Not Found!" });
    }

    return res.status(200).send({ message: "Book updated successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// delete a book (just need it's id)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).send({ message: "Book Not Found!" });
    }

    return res.status(200).send({ message: "Book deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
