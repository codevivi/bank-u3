import BaseModel from "./BaseModel.js";

const ACCOUNTS_DB_FILE_NAME = "accounts.json";
class AccountsModel extends BaseModel {
  constructor(fileName) {
    super(fileName);
  }
}
export const accountsModel = new AccountsModel(ACCOUNTS_DB_FILE_NAME);
