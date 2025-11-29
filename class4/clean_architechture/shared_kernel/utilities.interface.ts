export interface IEmailValidator {
    isValid(email: string): boolean;
}

export interface IPasswordValidator {
    isLengthValid(password: string, minLength: number): boolean;
}

export interface IPasswordHash {
    hashPassword(password: string): Promise<string>;
    comparePasswords(password: string, hashed: string): Promise<boolean>;
}