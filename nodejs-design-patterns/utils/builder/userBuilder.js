/**
 * utils/builder/userBuilder.js
 * Builder pattern for step-by-step creation of User
 */
const User = require('../../domain/entities/user');

class UserBuilder {
    constructor() {
        this.name = '';
        this.email = '';
        this.role = 'user';
    }

    setName(name) { this.name = name; return this; }
    setEmail(email) { this.email = email; return this; }
    setRole(role) { this.role = role; return this; }
    build() { return new User(null, this.name, this.email, this.role); }
}

module.exports = UserBuilder;
