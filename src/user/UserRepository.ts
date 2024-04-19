import { User, UserData } from "./User";
import { BaseModel } from "../db/basemodel";

const tableName = "User";
const booleanColumns = ["isActive"];

export class UserRepository extends BaseModel<User, UserData> {
  constructor() {
    super(tableName, booleanColumns);
  }
}
