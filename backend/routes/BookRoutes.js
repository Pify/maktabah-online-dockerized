const express = require('express');
const { check, body } = require('express-validator');
const authMiddleware = require('../middlewares/auth');
const BookController = require('../controllers/BookController');

const router = express.Router();

const bookValidationRules = [
    check('title').notEmpty().withMessage('Title is required'),
    check('author').notEmpty().withMessage('Author is required'),
    check('type').notEmpty().withMessage('type is required'),
    check('dateAdded').notEmpty().withMessage('date added is required'),
    check('source').notEmpty().withMessage('source is required'),
    check('isOld').notEmpty().withMessage('isOld is required'),
    check('shelfCategory').notEmpty().withMessage('shelf category is required'),

    body('yearPublished')
        .optional({ checkFalsy: true })
        .isInt({ min: 1500, max: new Date().getFullYear() })
        .withMessage('Year must be a valid number'),

    body('publisher')
        .optional({ checkFalsy: true })
        .isString()
        .withMessage('Publisher must be a string'),

    body()
        .custom((value) => {
            const { yearPublished, publisher } = value;
            if ((yearPublished && !publisher) || (!yearPublished && publisher)) {
                throw new Error('Both yearPublished and publisher must be provided together');
            }
            return true;
        }),
];

// Create a new book entry
router.post(
    '/',
    authMiddleware,
    bookValidationRules,
    BookController.create
);

// Get all books or a specific book by ID
router.get(
    '/',
    authMiddleware,
    BookController.get
);

// Update a book entry by ID
router.put(
    '/:id',
    authMiddleware,
    bookValidationRules,
    BookController.update
);

// Delete a book entry by ID
router.delete(
    '/:id',
    authMiddleware,
    BookController.delete
);

module.exports = router;
