const express = require('express');
const { check, validationResult } = require('express-validator');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

const registerValidationRules = [
  check('email')
    .notEmpty().withMessage('Mohon isi email anda')
    .isEmail().withMessage('Harus berupa alamat email yang valid')
    .normalizeEmail(),

  check('password')
    .notEmpty().withMessage('Mohon isi password anda')
    .isLength({ min: 8 }).withMessage('Kata sandi minimal harus terdiri dari 8 karakter')
    .trim()
];

const loginValidationRules = [
  check('email')
    .notEmpty().withMessage('Mohon isi email anda')
    .isEmail().withMessage('Harus berupa alamat email yang valid')
    .normalizeEmail(),

  check('password')
    .notEmpty().withMessage('Mohon isi password anda')
    .trim()
];

// Register
router.post(
  '/register',
  registerValidationRules,
  AuthController.register
);

// Login
router.post(
  '/login',
  loginValidationRules,
  AuthController.login
);

module.exports = router;
