import { UserRepository } from "./UserRepository";

export class UserService {
  userRepository = new UserRepository();

  public async getUser(userId: string) {
    const ctx = { fn: "getUser", userId };
    console.log(ctx, "Starting");

    const user = await this.userRepository.getUser(userId);
    console.log({ ctx, user }, "Retrieved user");
  }
}
