/**
 * infrastructure/commands/commandHandler.js
 * Command pattern: encapsulates requests as objects
 */
class CommandHandler {
    execute(command) {
        return command.execute();
    }
}

class RegisterUserCommand {
    constructor(userService, payload) {
        this.userService = userService;
        this.payload = payload;
    }

    execute() {
        return this.userService.registerUser(this.payload);
    }
}

class CreateTaskCommand {
    constructor(taskService, payload) {
        this.taskService = taskService;
        this.payload = payload;
    }

    execute() {
        return this.taskService.createTask(this.payload);
    }
}

module.exports = { CommandHandler, RegisterUserCommand, CreateTaskCommand };
