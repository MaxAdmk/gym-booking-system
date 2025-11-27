const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'secret_key_for_authorization';

class AuthService {

    async register(userData) {
        const existingUser = await UserRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.hashedPassword, salt);

        return await UserRepository.save({
            ...userData,
            passwordHash: hashedPassword
        });
    }

    async login(email, password) {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        // Genering the token
        const token = jwt.sign(
            { id: userId, role: user.role },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        return { token, user };
    }

}

module.exports = new AuthService();