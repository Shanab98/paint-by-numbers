import { UserRepository } from "./UserRepository";
import { UserData } from "./User";

export class UserService {
  userRepository = new UserRepository();

  public async getUserById(userId: number) {
    const ctx = { fn: "getUserById", userId };
    console.log(ctx, "Starting");

    const user = await this.userRepository.findById(userId);
    console.log({ ctx, user }, "Retrieved user");
  }

  public async createUser(user: UserData) {
    const ctx = { fn: "createUser", user };
    console.log(ctx, "Starting");

    const createdUser = await this.userRepository.create(user);
    console.log({ ctx, createdUser }, "Created user");
  }
}
