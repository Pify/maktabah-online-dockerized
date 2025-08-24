const { validationResult } = require("express-validator");
const BookService = require('../services/BookService');

class BookController {
    static async create(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const data = req.body;

        try {
            const book = await BookService.create(data);

            res.status(201).json({
                message: "Book entry created successfully",
                book
            });
        } catch (error) {
            console.error("BookController - create: ", error);
            next(error);
        }
    }

    static async get(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || undefined;
            const type = req.query.type || undefined;
            const isOld = req.query.isOld || undefined;
            const shelfCategory = req.query.shelfCategory || undefined;

            if (req.query.id) {
                const book = await BookService.findById(req.query.id);
                if (!book) return res.status(404).json({ message: "Book not found" });
                return res.json(book);
            }

            const { books,
                totalItems,
                totalPages, } = await BookService.findAll(page, limit, { search, type, isOld, shelfCategory });

            return res.json({
                data: books,
                meta: {
                    page,
                    limit,
                    totalItems,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1,
                }
            });
        } catch (error) {
            console.error("BookController - get: ", error);
            error.statusCode = 400;
            error.message = "Error retrieving book entries";
            next(error);
        }
    }

    static async update(req, res, next) {
        const { id } = req.params;
        const {
            title, author, yearPublished,
            publisher, type, dateAdded,
            source, isOld, shelfCategory
        } = req.body;

        try {
            const updatedBook = await BookService.update(id, {
                title,
                author,
                yearPublished,
                publisher,
                type,
                dateAdded,
                source,
                isOld,
                shelfCategory
            });

            if (!updatedBook) return res.status(404).json({ message: "Book not found" });

            res.json({
                message: "Book entry updated successfully",
                book: updatedBook
            });
        } catch (error) {
            console.error("BookController - update: ", error);
            next(error);
        }
    }

    static async delete(req, res, next) {
        const { id } = req.params;

        try {
            const deletedBook = await BookService.delete(id);
            if (!deletedBook) return res.status(404).json({ message: "Book not found" });

            res.json({
                message: "Book entry deleted successfully",
                book: deletedBook
            });
        } catch (error) {
            console.error("BookController - delete: ", error);
            next(error);
        }
    }
}

module.exports = BookController;