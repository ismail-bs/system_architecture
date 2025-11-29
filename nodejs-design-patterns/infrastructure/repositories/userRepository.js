/**
 * infrastructure/repositories/userRepository.js
 * Repository pattern: abstracts DB operations for Users
 */
const db = require('../../core/database');
const User = require('../../domain/entities/user');

class UserRepository {
    constructor() {
        this.db = db;
        this.nextId = 1;
    }

    save(user) {
        user.id = this.nextId++;
        this.db.users.push(user);
        return user;
    }

    findAll() {
        return this.db.users;
    }

    findByEmail(email) {
        return this.db.users.find(u => u.email === email);
    }
}

module.exports = UserRepository;
