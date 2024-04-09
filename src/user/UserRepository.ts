import { Knex } from "knex";
import { knexInstance } from "../db/KnexInstance";
import { User, UserData } from "./User";

export class UserRepository {
  constructor(private readonly knex: Knex = knexInstance) {}

  async create(user: UserData): Promise<User> {
    const [createdUser] = await this.knex("User").insert(user).returning("*");
    return createdUser as User;
  }

  async findById(id: number): Promise<User | undefined> {
    const [user] = await this.knex("User").where({ id });
    return user as User | undefined;
  }

  // async findByEmail(email: string): Promise<User | undefined> {
  //   const [user] = await this.knex("User").where({ email });
  //   return user as User | undefined;
  // }

  async update(user: User): Promise<User> {
    const [updatedUser] = await this.knex("User")
      .where({ id: user.id })
      .update(user)
      .returning("*");
    return updatedUser as User;
  }

  async delete(id: number): Promise<void> {
    await this.knex("User").where({ id }).delete();
  }
}
