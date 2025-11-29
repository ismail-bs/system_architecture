import { Request, Response } from "express";
import { User } from "../domain/user.class";

export interface IUsersController {
    registerUser(req: Request, res: Response): Promise<void>;
}

export interface IUserRepository {
    save(user: User): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
}

export interface IUserService {
    registerUser(user: {
        name: string;
        dob: string;
        email: string;
        password: string;
    }): Promise<{ success: boolean; errors?: string[]; user?: User }>;
}
