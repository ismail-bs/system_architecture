import { UserService } from "../application/user.service";
import { UsersController } from "../presentation/user.controller";
import { EmailValidator } from "./email.validator";
import { PasswordHasher } from "./password.hash";
import { PasswordValidator } from "./password.validator";
import { UserRepository } from "./user.repository";

// infrastructure
const emailValidator = new EmailValidator();
const passwordValidator = new PasswordValidator();
const passwordHasher = new PasswordHasher();
const userRepo = new UserRepository();

// application / presentation
const userService = new UserService(passwordHasher, userRepo);
const usersController = new UsersController(emailValidator, passwordValidator, userService);

export { usersController };
