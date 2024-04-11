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
    const [createdEntry] = await this.knex(this.tableName).insert(entry);
    return createdEntry as Entry;
  }

  async saveAll(entries: EntryData[]): Promise<Entry[]> {
    const createdEntries = await this.knex(this.tableName).insert(entries);
    return createdEntries as Entry[];
  }

  async findOneWhere(where: Partial<Entry>): Promise<Entry> {
    return (await this.knex(this.tableName).where(where).first()) as Entry;
  }

  async findAllWhere(where: Partial<Entry>): Promise<Entry> {
    //TODO: add limit and offset
    return (await this.knex(this.tableName).where(where)) as Entry;
  }

  async updateWhere(where: Partial<Entry>, update: Partial<Entry>) {
    return await this.knex(this.tableName).where(where).update(update);
  }
}
