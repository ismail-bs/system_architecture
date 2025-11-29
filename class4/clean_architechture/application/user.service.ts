import { User } from "../domain/user.class";
import { IUserRepository, IUserService } from "../shared_kernel/user.interface";
import { IPasswordHash } from "../shared_kernel/utilities.interface";

export class UserService implements IUserService {
  private passwordHasher: IPasswordHash;
  private userRepo: IUserRepository;

  constructor(passwordHasher: IPasswordHash, userRepo: IUserRepository) {
    this.passwordHasher = passwordHasher;
    this.userRepo = userRepo;
  }

  async registerUser(user: {
    name: string;
    dob: string;
    email: string;
    password: string;
  }): Promise<{ success: boolean; errors?: string[], user?: User }> {
    // Hash the password
    const hashed = await this.passwordHasher.hashPassword(user.password);

    // Validate user data
    const userInstance = new User();
    userInstance.name = user.name;
    userInstance.dob = user.dob;
    userInstance.email = user.email;
    userInstance.password = hashed;

    // Run validations
    const validation = userInstance.validation();
    if (!validation.valid) {
      return { success: false, errors: validation.errors };
    }

    // Check for existing user
    const existingUser = await this.userRepo.findUserByEmail(user.email);
    if (existingUser) {
      return { success: false, errors: ['email already registered'] };
    }

    // Save user
    const savedUser = await this.userRepo.save(userInstance);
    if (!savedUser) {
      return { success: false, errors: ['failed to save user'] };
    }

    return { success: true, user: savedUser };
  }
}
