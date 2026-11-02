
const Database = require("better-sqlite3");
const path = require("path");

// Create database
const db = new Database(
  path.join(__dirname, "aetherfield.db")
);

// Create tables
db.exec(`

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tag TEXT,
  mins INTEGER,
  excerpt TEXT,
  author TEXT,
  date TEXT,
  img TEXT,
  body TEXT
);

CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  type TEXT,
  location TEXT,
  summary TEXT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS team (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  title TEXT,
  email TEXT
);

CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  created TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id INTEGER,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  created TEXT DEFAULT CURRENT_TIMESTAMP
);

`);

console.log("Aetherfield database created successfully!");

module.exports = db;
