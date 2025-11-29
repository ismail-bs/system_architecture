/**
 * infrastructure/repositories/taskRepository.js
 * Repository pattern: abstracts DB operations for Tasks
 */
const db = require('../../core/database');
const Task = require('../../domain/entities/task');

class TaskRepository {
    constructor() {
        this.db = db;
        this.nextId = 1;
    }

    save(task) {
        task.id = this.nextId++;
        this.db.tasks.push(task);
        return task;
    }

    findAll() {
        return this.db.tasks;
    }
}

module.exports = TaskRepository;
