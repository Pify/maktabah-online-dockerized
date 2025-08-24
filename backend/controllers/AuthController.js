const { validationResult } = require("express-validator");
const UserService = require("../services/UserService");

class AuthController {
    static async register(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const existingUser = await UserService.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const newUser = await UserService.create({ email, password });
            res.status(201).json({
                message: "User registered successfully",
                user: newUser
            });
        } catch (error) {
            console.error("AuthController - register: ", error);
            next(error);
        }
    }

    static async login(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await UserService.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const validPassword = await UserService.comparePassword(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = await UserService.generateJWT(user);
            res.json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    email: user.email
                }
            });
        } catch (error) {
            console.error("AuthController - login: ", error);
            next(error);
        }
    }
}

module.exports = AuthController;