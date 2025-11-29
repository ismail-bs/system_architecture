/**
 * core/database.js
 * Singleton pattern: single DB instance shared across the app
 */
class Database {
    constructor() {
        if (Database.instance) return Database.instance;
        this.users = [];
        this.tasks = [];
        Database.instance = this;
    }
}

module.exports = new Database();
