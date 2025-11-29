/**
 * app.js
 * Entry point for Express server
 * Demonstrates all patterns wired together
 */
const express = require('express');
const bodyParser = require('express').json;
const container = require('./core/container');

const UserService = require('./domain/services/userService');
const TaskService = require('./domain/services/taskService');
const UserRepository = require('./infrastructure/repositories/userRepository');
const TaskRepository = require('./infrastructure/repositories/taskRepository');
const ProxyCache = require('./infrastructure/cache/proxyCache');
const { CommandHandler, RegisterUserCommand, CreateTaskCommand } = require('./infrastructure/commands/commandHandler');
const EventBus = require('./infrastructure/events/eventBus');
const NotificationFactory = require('./infrastructure/notifications/notificationFactory');
const EmailAdapter = require('./infrastructure/notifications/legacyEmailAdapter');
const { validator } = require('./middlewares/validator');
const { logger: mwLogger } = require('./middlewares/logger');
const withLogging = require('./infrastructure/decorators/loggerDecorator');

const app = express();
app.use(bodyParser());
app.use(mwLogger);

// Repositories with Proxy Cache
const userRepo = new ProxyCache(new UserRepository());
const taskRepo = new ProxyCache(new TaskRepository());

// Services
const userService = new UserService(userRepo);
userService.registerUser = withLogging(userService.registerUser.bind(userService), 'UserService.registerUser');

const taskService = new TaskService(taskRepo, userRepo);
taskService.createTask = withLogging(taskService.createTask.bind(taskService), 'TaskService.createTask');

// DI container
container.register('userService', userService);
container.register('taskService', taskService);
container.register('userRepository', userRepo);
container.register('taskRepository', taskRepo);
const commandHandler = new CommandHandler();
container.register('commandHandler', commandHandler);

// EventBus (Observer)
EventBus.on('user.registered', (user) => {
    const notifier = NotificationFactory.create('email');
    notifier.send(user, `Welcome ${user.name}!`);
    const legacy = new EmailAdapter();
    legacy.send(user, `Legacy welcome for ${user.name}`);
});
EventBus.on('task.created', (task) => {
    console.log('Observer: Task created ->', task.title);
});

// Routes
app.post('/users', validator, (req, res) => {
    const { name, email, role } = req.body;
    const cmd = new RegisterUserCommand(userService, { name, email, role });
    commandHandler.execute(cmd);
    res.status(201).json({ message: 'User registered', user: { name, email, role: role || 'user' } });
});

app.get('/users', (req, res) => {
    res.json({ users: userRepo.findAll() });
});

app.post('/tasks', validator, (req, res) => {
    const { title, description, assignedTo } = req.body;
    const cmd = new CreateTaskCommand(taskService, { title, description, assignedTo });
    commandHandler.execute(cmd);
    res.status(201).json({ message: 'Task created', task: { title, description, assignedTo } });
});

app.get('/tasks', (req, res) => {
    res.json({ tasks: taskRepo.findAll() });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
