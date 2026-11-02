
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve your frontend
app.use(express.static(
  path.join(__dirname, "../aetherfield")
));
// Test API
app.get("/api", (req, res) => {
  res.json({
    message: "Aetherfield backend is working!"
  });
});

// GET ALL ARTICLES
app.get("/api/articles", (req, res) => {
  const articles = db.prepare(
    "SELECT * FROM articles ORDER BY id DESC"
  ).all();

  res.json(articles);
});

// GET SINGLE ARTICLE
app.get("/api/articles/:slug", (req, res) => {
  const article = db.prepare(
    "SELECT * FROM articles WHERE slug = ?"
  ).get(req.params.slug);

  if (!article) {
    return res.status(404).json({
      error: "Article not found"
    });
  }

  res.json(article);
});

// GET ALL JOBS
app.get("/api/jobs", (req, res) => {
  const jobs = db.prepare(
    "SELECT * FROM jobs ORDER BY id DESC"
  ).all();

  res.json(jobs);
});

// GET SINGLE JOB
app.get("/api/jobs/:id", (req, res) => {
  const job = db.prepare(
    "SELECT * FROM jobs WHERE id = ?"
  ).get(req.params.id);

  if (!job) {
    return res.status(404).json({
      error: "Job not found"
    });
  }

  res.json(job);
});

// GET TEAM
app.get("/api/team", (req, res) => {
  const team = db.prepare(
    "SELECT * FROM team"
  ).all();

  res.json(team);
});

// NEWSLETTER SUBSCRIPTION
app.post("/api/subscribe", (req, res) => {
  const { email } = req.body;

  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({
      error: "Valid email required"
    });
  }

  try {
    db.prepare(
      "INSERT INTO subscribers (email) VALUES (?)"
    ).run(email.trim().toLowerCase());

    res.json({
      success: true,
      message: "Successfully subscribed!"
    });

  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(409).json({
        error: "Email already subscribed"
      });
    }

    res.status(500).json({
      error: "Subscription failed"
    });
  }
});

// JOB APPLICATION
app.post("/api/apply", (req, res) => {
  const { jobId, name, email, message } = req.body;

  if (
    !Number.isInteger(Number(jobId)) ||
    !name?.trim() ||
    !email?.trim()
  ) {
    return res.status(400).json({
      error: "Job, name and email are required"
    });
  }

  const job = db.prepare(
    "SELECT id FROM jobs WHERE id = ?"
  ).get(Number(jobId));

  if (!job) {
    return res.status(404).json({
      error: "Job not found"
    });
  }

  db.prepare(`
    INSERT INTO applications
    (job_id, name, email, message)
    VALUES (?, ?, ?, ?)
  `).run(
    Number(jobId),
    name.trim(),
    email.trim(),
    message || ""
  );

  res.json({
    success: true,
    message: "Application submitted!"
  });
});

// START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Aetherfield running at http://localhost:${PORT}`
  );
});
