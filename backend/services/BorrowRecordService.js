const { v4: uuidv4 } = require('uuid');
const { BorrowRecord, Book } = require('../models');

class BorrowRecordService {
    static async create({
        bookId,
        borrowerName,
        borrowerAge,
        borrowedAt,
        estimatedReturnAt, }) {

        // Check if book exists
        const book = await Book.findByPk(bookId);
        if (!book) throw new Error('Book not found');
        if (book.isBorrowed) throw new Error('Book is already borrowed');

        // Create borrow record
        const borrowRecord = await BorrowRecord.create({
            id: uuidv4(),
            bookId,
            borrowerName,
            borrowerAge,
            borrowedAt,
            estimatedReturnAt,
            status: 'Dipinjam',
            returnedAt: null,
        });

        book.isBorrowed = true;
        await book.save();

        return borrowRecord;
    }

    static async returnBook(borrowRecordId, returnDate = new Date()) {
        const borrowRecord = await BorrowRecord.findByPk(borrowRecordId, { include: Book });
        if (!borrowRecord) throw new Error('Borrow record not found');
        if (borrowRecord.returnedAt) throw new Error('Book has already been returned');

        borrowRecord.returnedAt = returnDate;
        borrowRecord.status = 'Dikembalikan';
        await borrowRecord.save();

        const book = await Book.findByPk(borrowRecord.bookId);
        book.isBorrowed = false;
        await book.save();

        return borrowRecord;
    }


    static async findById(id) {
        return await BorrowRecord.findByPk(id, { include: [Book] });
    }

    static async findAll({page = 1, limit = 10}) {
        const offset = (page - 1) * limit;

        const result = await BorrowRecord.findAndCountAll({
            include: [Book],
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        return {
            records: result.rows,
            totalRecords: result.count,
            totalPages: Math.ceil(result.count / limit),
            currentPage: page,
            limit
        };
    }

    static async delete(id) {
        const record = await BorrowRecord.findByPk(id);
        if (!record) return null;
        await record.destroy();
        return record;
    }
}

module.exports = BorrowRecordService;