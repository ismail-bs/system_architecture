import { IEmailValidator } from "../shared_kernel/utilities.interface";

export class EmailValidator implements IEmailValidator {
  isValid(email: string): boolean {
    if (!email || typeof email !== 'string') return false;
    // simple RFC-like check
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
