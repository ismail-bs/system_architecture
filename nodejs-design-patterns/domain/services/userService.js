/**
 * domain/services/userService.js
 * Business logic for Users, uses Repository pattern and Builder
 */
const UserBuilder = require('../../utils/builder/userBuilder');
const EventBus = require('../../infrastructure/events/eventBus');

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    registerUser({ name, email, role }) {
        const builder = new UserBuilder().setName(name).setEmail(email).setRole(role);
        const user = builder.build();
        this.userRepository.save(user);
        EventBus.emit('user.registered', user); // Observer pattern
        return user;
    }
}

module.exports = UserService;
