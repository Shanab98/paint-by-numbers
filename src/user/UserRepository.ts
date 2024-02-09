export class UserRepository {
  public async getUser(userId: string) {
    return userId ? { userId: "shana", password: "pass" } : { userId: "error" };
  }
}
