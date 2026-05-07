import { DatabaseSync } from "node:sqlite"

import path from 'path';

const database = new DatabaseSync(
  path.resolve(process.cwd(), 'data', 'main.db')
);

const initDatabase = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  is_online BOOLEAN NOT NULL DEFAULT 0,
  created_at DATETIME
);
`;

database.exec(initDatabase)

export default database