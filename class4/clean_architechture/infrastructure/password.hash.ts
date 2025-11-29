import { IPasswordHash } from "../shared_kernel/utilities.interface";
import crypto from "crypto";

export class PasswordHasher implements IPasswordHash {
  async hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.createHmac("sha256", salt).update(password).digest("hex");
    return `${salt}:${hash}`;
  }

  async comparePasswords(password: string, hashed: string): Promise<boolean> {
    if (!hashed || typeof hashed !== 'string') return false;
    const parts = hashed.split(":");
    if (parts.length !== 2) return false;
    const [salt, hash] = parts;
    const computed = crypto.createHmac("sha256", salt).update(password).digest("hex");
    return computed === hash;
  }
}
