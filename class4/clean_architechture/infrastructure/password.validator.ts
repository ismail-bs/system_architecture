import { IPasswordValidator } from "../shared_kernel/utilities.interface";

export class PasswordValidator implements IPasswordValidator {
  isLengthValid(password: string, minLength: number): boolean {
    if (typeof password !== 'string') return false;
    return password.length >= minLength;
  }
}
