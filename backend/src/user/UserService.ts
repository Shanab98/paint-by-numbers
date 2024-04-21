import { UserRepository } from "./UserRepository";
import { User, UserData } from "./User";

export class UserService {
  constructor(private userRepository = new UserRepository()) {}

  public async createUser(username: string, password: string, email: string) {
    const ctx = { fn: "createUser", username, password, email };
    console.log(ctx, "Starting");

    return await this.userRepository.saveOne({
      username,
      password,
      email,
      isActive: true,
    });
  }

  public async getUser(filter: Partial<User>): Promise<User | undefined> {
    const ctx = { fn: "getUser", filter };
    console.log(ctx, "Starting");

    const user = await this.userRepository.findOneWhere(filter);
    console.log({ ctx, user }, "Retrieved user");
    return user;
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
