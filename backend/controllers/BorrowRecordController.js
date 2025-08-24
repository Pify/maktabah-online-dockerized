const { validationResult } = require("express-validator");
const BorrowRecordService = require('../services/BorrowRecordService');

class BorrowRecordController {
    static async create(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            bookId,
            borrowerName,
            borrowerAge,
            borrowedAt,
            estimatedReturnAt,
        } = req.body;

        try {
            const borrowRecord = await BorrowRecordService.create({
                bookId,
                borrowerName,
                borrowerAge,
                borrowedAt,
                estimatedReturnAt,
            });

            res.status(201).json({
                message: "Borrow record created successfully",
                borrowRecord
            });
        } catch (error) {
            console.error("BorrowRecordController - create: ", error);
            next(error);
        }
    }

    static async returnBook(req, res, next) {
        const { borrowRecordId: id } = req.params;
        const returnDate = req.body.returnDate ? new Date(req.body.returnDate) : new Date();

        try {
            const borrowRecord = await BorrowRecordService.returnBook(id, returnDate);
            res.status(200).json({
                message: "Book returned successfully",
                borrowRecord
            });
        } catch (error) {
            console.error("BorrowRecordController - returnBook: ", error);
            res.status(400).json({
                message: error.message || "Failed to return book",
            });
        }
    }

    static async get(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const records = await BorrowRecordService.findAll({page, limit});
            res.json(records);
        } catch (err) {
            next(err);
        }
    }

    static async findById(req, res, next) {
        try {
            const { id } = req.params;
            const record = await BorrowRecordService.findById(id);

            if (!record) {
                return res.status(404).json({ message: 'Record not found' });
            }

            res.json(record);
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const record = await BorrowRecordService.delete(id);

            if (!record) {
                return res.status(404).json({ message: 'Record not found' });
            }

            res.json({ message: 'Record deleted successfully', record });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = BorrowRecordController;