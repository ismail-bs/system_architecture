/**
 * domain/services/taskService.js
 * Business logic for Tasks, uses Repository pattern and Builder
 */
const TaskBuilder = require('../../utils/builder/taskBuilder');
const EventBus = require('../../infrastructure/events/eventBus');

class TaskService {
    constructor(taskRepository, userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    createTask({ title, description, assignedTo }) {
        const user = this.userRepository.findByEmail(assignedTo);
        const builder = new TaskBuilder().setTitle(title).setDescription(description).setAssignedTo(user);
        const task = builder.build();
        this.taskRepository.save(task);
        EventBus.emit('task.created', task); // Observer pattern
        return task;
    }
}

module.exports = TaskService;
