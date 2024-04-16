import { Knex } from "knex";
import { knexInstance } from "../db/KnexInstance";

export abstract class BaseModel<Entry, EntryData> {
  constructor(
    public readonly tableName: string,
    public readonly booleanColumns: string[],
    public readonly knex: Knex = knexInstance,
  ) {
    this.tableName = tableName;
    this.knex = knex;
  }

  async saveOne(entry: EntryData): Promise<Entry> {
    const [createdEntry] = await this.knex(this.tableName).insert(entry);
    return createdEntry as Entry;
  }

  async saveAll(entries: EntryData[]) {
    return this.knex(this.tableName).insert(entries);
  }

  async deleteAllWhere(where: Partial<Entry>) {
    return this.knex(this.tableName).where(where).del();
  }

  async findOneWhere(where: Partial<Entry>): Promise<Entry> {
    const entry = (await this.knex(this.tableName)
      .where(where)
      .first()
      .then((row) => (row ? this.castBooleanValues(row) : undefined))) as Entry;
    return entry;
  }

  async findAllWhere(
    where: Partial<Entry>,
    limit: number = 200,
    offset: number = 0,
  ): Promise<Entry[]> {
    return (await this.knex(this.tableName)
      .where(where)
      .limit(limit)
      .offset(offset)
      .then((rows) =>
        rows.map((row) => this.castBooleanValues(row)),
      )) as Entry[];
  }

  async updateWhere(where: Partial<Entry>, update: Partial<Entry>) {
    return this.knex(this.tableName).where(where).update(update);
  }

  private castBooleanValues(entry: Entry): Entry {
    for (const key in entry) {
      if (this.booleanColumns.includes(key)) {
        entry[key] = (entry[key] == 1 ? true : false) as Entry[Extract<
          keyof Entry,
          string
        >];
      }
    }

    return entry;
  }
}
