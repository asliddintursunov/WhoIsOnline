"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_sqlite_1 = require("node:sqlite");
const path_1 = __importDefault(require("path"));
const database = new node_sqlite_1.DatabaseSync(path_1.default.resolve(process.cwd(), 'data', 'main.db'));
const initDatabase = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  is_online BOOLEAN NOT NULL DEFAULT 0,
  created_at DATETIME
);
`;
database.exec(initDatabase);
exports.default = database;
