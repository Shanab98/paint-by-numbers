import { Knex } from "knex";
import { knexInstance } from "./dbConfig";

export abstract class BaseModel<Entry, EntryData> {
  constructor(
    public readonly tableName: string,
    public readonly booleanColumns: string[],
    public readonly Db: Knex = knexInstance,
  ) {
    this.tableName = tableName;
    this.Db = Db;
  }

  public async saveOne(entry: EntryData) {
    return this.Db(this.tableName).insert(entry);
  }

  public async saveAll(entries: EntryData[]) {
    return this.Db(this.tableName).insert(entries);
  }

  public async deleteAllWhere(where: Partial<Entry>) {
    return this.Db(this.tableName).where(where).del();
  }

  public async findOneWhere(where: Partial<Entry>): Promise<Entry> {
    return (await this.Db(this.tableName)
      .where(where)
      .first()
      .then((row) => (row ? this.castBooleanValues(row) : undefined))) as Entry;
  }

  public async findAllWhere(
    where: Partial<Entry>,
    limit: number = 200,
    offset: number = 0,
  ): Promise<Entry[]> {
    return (await this.Db(this.tableName)
      .where(where)
      .limit(limit)
      .offset(offset)
      .then((rows) =>
        rows.map((row) => this.castBooleanValues(row)),
      )) as Entry[];
  }

  public async updateWhere(where: Partial<Entry>, update: Partial<Entry>) {
    return this.Db(this.tableName).where(where).update(update);
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
