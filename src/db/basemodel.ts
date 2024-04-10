import { Knex } from "knex";
import { knexInstance } from "../db/KnexInstance";

export abstract class BaseModel<Entry, EntryData> {
  constructor(
    public readonly tableName: string,
    public readonly knex: Knex = knexInstance,
  ) {
    this.tableName = tableName;
    this.knex = knex;
  }

  async saveOne(entry: EntryData): Promise<Entry> {
    const [createdEntry] = await this.knex(this.tableName)
      .insert(entry)
      .returning("*");
    return createdEntry as Entry;
  }

  async findOne(where: Partial<Entry>): Promise<Entry> {
    return (await this.knex(this.tableName)
      .where(where)
      .returning("*")) as Entry;
  }
}

// async findByEmail(email: string): Promise<User | undefined> {
//   const [user] = await this.knex("User").where({ email });
//   return user as User | undefined;
// }

// async update(user: User): Promise<User> {
//   const [updatedUser] = await this.knex(this.tableName)
//     .where({ id: user.id })
//     .update(user)
//     .returning("*");
//   return updatedUser as User;
// }

// async delete(id: number): Promise<void> {
//   await this.knex(this.tableName).where({ id }).delete();
// }
// }
