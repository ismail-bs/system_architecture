/**
 * utils/builder/taskBuilder.js
 * Builder pattern for step-by-step creation of Task
 */
const Task = require('../../domain/entities/task');

class TaskBuilder {
    constructor() {
        this.title = '';
        this.description = '';
        this.assignedTo = null;
    }

    setTitle(title) { this.title = title; return this; }
    setDescription(desc) { this.description = desc; return this; }
    setAssignedTo(user) { this.assignedTo = user; return this; }
    build() { return new Task(null, this.title, this.description, this.assignedTo); }
}

module.exports = TaskBuilder;
