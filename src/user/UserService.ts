import { UserRepository } from "./UserRepository";
import { User, UserData } from "./User";

export class UserService {
  userRepository = new UserRepository();

  public async createUser(user: UserData) {
    const ctx = { fn: "createUser", user };
    console.log(ctx, "Starting");

    const createdUser = await this.userRepository.saveOne(user);
    console.log({ ctx, createdUser }, "Created user");
  }

  public async getUser(filter: Partial<User>) {
    const ctx = { fn: "getUser", filter };
    console.log(ctx, "Starting");

    const user = await this.userRepository.findOneWhere(filter);
    console.log({ ctx, user }, "Retrieved user");
  }

  //TODO: remove this method eventually, solely here to test non-basemodel method
  public async getUserById(userId: number) {
    const ctx = { fn: "getUserById", userId };
    console.log(ctx, "Starting");

    const user = await this.userRepository.findById(userId);
    console.log({ ctx, user }, "Retrieved user");
  }

  public async updateUserByUsername(
    username: string,
    update: Partial<UserData>,
  ) {
    const ctx = { fn: "updateUser", username };
    console.log(ctx, "Starting");

    const updatedUser = await this.userRepository.updateWhere(
      { username: username },
      update,
    );
    console.log({ ctx, updatedUser }, "Updated user");
  }
}
