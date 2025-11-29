/**
 * domain/entities/task.js
 * Represents a Task entity (OOP, domain model)
 */
class Task {
    constructor(id, title, description, assignedTo) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.assignedTo = assignedTo;
    }
}

module.exports = Task;
