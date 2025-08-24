const express = require('express');
const { check, body } = require('express-validator');
const authMiddleware = require('../middlewares/auth');
const BorrowRecordController = require('../controllers/BorrowRecordController');

const router = express.Router();

const recordValidationRules = [
    check('bookId')
        .notEmpty().withMessage('Book ID is required'),

    check('borrowerName')
        .notEmpty().withMessage('Borrower name is required'),

    check('borrowerAge')
        .isInt({ min: 0 }).withMessage('Borrower age must be a valid number'),

    check('borrowedAt')
        .isISO8601().toDate().withMessage('Borrowed at must be a valid date'),

    check('estimatedReturnAt')
        .isISO8601().toDate().withMessage('Estimated return date must be a valid date'),

    body().custom(({ borrowedAt, estimatedReturnAt }) => {
        if (!borrowedAt || !estimatedReturnAt) return true;

        const borrowedDate = new Date(borrowedAt);
        const returnDate = new Date(estimatedReturnAt);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Allow borrowedAt to be today or later
        if (borrowedDate < today) {
            throw new Error('Borrow date cannot be in the past');
        }

        // Require return date to be strictly in the future
        if (returnDate <= today) {
            throw new Error('Estimated return date must be after today');
        }

        // Borrow date must be before return date
        if (borrowedDate >= returnDate) {
            throw new Error('Borrow date must be before estimated return date');
        }

        // Reject if both fall on same day
        if (borrowedDate.toDateString() === returnDate.toDateString()) {
            throw new Error('Borrow and return dates must not be the same day');
        }

        return true;
    })
];

router.get(
    '/',
    authMiddleware,
    BorrowRecordController.get
);

router.post(
    '/',
    authMiddleware,
    recordValidationRules,
    BorrowRecordController.create
);

router.put(
    '/:borrowRecordId/return',
    authMiddleware,
    check('returnDate').optional().isISO8601().toDate().withMessage('Return date must be a valid date'),
    BorrowRecordController.returnBook
);

module.exports = router;