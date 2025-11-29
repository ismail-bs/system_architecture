import { Request, Response } from 'express';
import { IUsersController, IUserService } from '../shared_kernel/user.interface';
import { IEmailValidator, IPasswordValidator } from '../shared_kernel/utilities.interface';


export class UsersController implements IUsersController {
    private emailValidator: IEmailValidator;
    private passwordValidator: IPasswordValidator;
    private userService: IUserService;

    constructor(emailValidator: IEmailValidator, passwordValidator: IPasswordValidator, userService: IUserService) {
        this.emailValidator = emailValidator;
        this.passwordValidator = passwordValidator;
        this.userService = userService;
    }

    async registerUser(req: Request, res: Response): Promise<void> {
        const { name, dob, email, password } = req.body;

        // validate input presence
        if (!name || !dob || !email || !password) {
            res.status(400).json({ errors: ['name, dob, email, and password are required'] });
            return;
        }

        // validate email format
        if (!this.emailValidator.isValid(email)) {
            res.status(400).json({ errors: ['email is not a valid email'] });
            return;
        }

        // validate password length
        if (!this.passwordValidator.isLengthValid(password, 6)) {
            res.status(400).json({ errors: ['password must be at least 6 characters long'] });
            return;
        }

        const result = await this.userService.registerUser({
            name,
            dob,
            email,
            password,
        });

        if (result.success) {
            res.status(201).json({ message: 'User registered successfully', user: result.user });
        } else {
            res.status(400).json({ errors: result.errors });
        }
    }
}