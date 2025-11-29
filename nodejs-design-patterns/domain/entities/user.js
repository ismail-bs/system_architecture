/**
 * domain/entities/user.js
 * Represents a User entity (OOP, domain model)
 */
class User {
    constructor(id, name, email, role = 'user') {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}

module.exports = User;
