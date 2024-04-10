import { User, UserData } from "./User";
import { BaseModel } from "../db/basemodel";

const tableName = "User";

export class UserRepository extends BaseModel<User, UserData> {
  constructor() {
    super(tableName);
  }

  async findById(id: number): Promise<User | undefined> {
    const [user] = await this.knex(this.tableName).where({ id });
    return user as User | undefined;
  }

  // async findByEmail(email: string): Promise<User | undefined> {
  //   const [user] = await this.knex("User").where({ email });
  //   return user as User | undefined;
  // }

  // async update(user: User): Promise<User> {
  //   const [updatedUser] = await this.knex("User")
  //     .where({ id: user.id })
  //     .update(user)
  //     .returning("*");
  //   return updatedUser as User;
  // }

  // async delete(id: number): Promise<void> {
  //   await this.knex("User").where({ id }).delete();
  // }
}
