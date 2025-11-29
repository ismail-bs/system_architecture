import express from 'express';
import { EmailValidator } from './infrastructure/email.validator';
import { PasswordValidator } from './infrastructure/password.validator';
import { PasswordHasher } from './infrastructure/password.hash';
import { UserRepository } from './infrastructure/user.repository';
import { UserService } from './application/user.service';
import { UsersController } from './presentation/user.controller';

const app = express();
app.use(express.json());

// infrastructure
const emailValidator = new EmailValidator();
const passwordValidator = new PasswordValidator();
const passwordHasher = new PasswordHasher();
const userRepo = new UserRepository();

// application / presentation
const userService = new UserService(passwordHasher, userRepo);
const usersController = new UsersController(emailValidator, passwordValidator, userService);

app.post('/users/register', (req, res) => usersController.registerUser(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
