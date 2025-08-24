const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../models');

class UserService {
  static async create({ email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    const user = await User.create({
      id,
      email,
      password: hashedPassword,
    })

    return {
      id: user.id,
      email: user.email
    };
  }

  static async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  static async comparePassword(enteredPassword, storedPassword) {
    return bcrypt.compare(enteredPassword, storedPassword);
  }

  static generateJWT(user) {
    return jwt.sign({ id: user.id, username: user.email }, 'bismillahLancar', {
      expiresIn: '10m',
    });
  }
}

module.exports = UserService;
