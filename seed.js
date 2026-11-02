
const db = require("./db");

// Insert sample article
const article = db.prepare(`
  INSERT OR IGNORE INTO articles
  (slug, title, tag, mins, excerpt, author, date, img, body)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

article.run(
  "future-of-design",
  "The Future of Digital Design",
  "Design",
  5,
  "Exploring the future of creative technology.",
  "Aetherfield Team",
  "2026-11-02",
  "",
  "Digital design is constantly evolving. Welcome to Aetherfield."
);

// Insert sample job
const job = db.prepare(`
  INSERT INTO jobs
  (title, type, location, summary, description)
  VALUES (?, ?, ?, ?, ?)
`);

job.run(
  "UI/UX Designer",
  "Full-time",
  "Remote",
  "Create meaningful digital experiences.",
  "We are looking for a creative UI/UX designer."
);

console.log("Sample data added successfully!");

db.close();
