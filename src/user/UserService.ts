import { UserRepository } from "./UserRepository";
import { User, UserData } from "./User";

export class UserService {
  userRepository = new UserRepository();

  public async getUser(filter: Partial<User>) {
    const ctx = { fn: "getUser", filter };
    console.log(ctx, "Starting");

    const user = await this.userRepository.findOne(filter);
    console.log({ ctx, user }, "Retrieved user");
  }
  public async getUserById(userId: number) {
    const ctx = { fn: "getUserById", userId };
    console.log(ctx, "Starting");

    const user = await this.userRepository.findById(userId);
    console.log({ ctx, user }, "Retrieved user");
  }

  public async createUser(user: UserData) {
    const ctx = { fn: "createUser", user };
    console.log(ctx, "Starting");

    const createdUser = await this.userRepository.saveOne(user);
    console.log({ ctx, createdUser }, "Created user");
  }
}
