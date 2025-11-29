import { IUserRepository } from "../shared_kernel/user.interface";
import { User } from "../domain/user.class";

export class UserRepository implements IUserRepository {
  private users: User[] = [];

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const found = this.users.find((u) => u.email === email);
    return found || null;
  }
}
