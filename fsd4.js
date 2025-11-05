// app.js
const express = require('express');
const mysql = require('mysql2'); // use mysql2 for better support
const app = express();

// Middleware
app.use(express.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",              // change if needed
  password: "yourpassword",  // change if needed
  database: "projectDB"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to MySQL Database!");
});

// ✅ CREATE - Add a new user
app.post('/users', (req, res) => {
  const { username, email, password } = req.body;
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, username, email });
  });
});

// ✅ READ - Get all users
app.get('/users', (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// ✅ UPDATE - Update user details
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  const sql = "UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?";
  db.query(sql, [username, email, password, id], (err, result) => {
    if (err) throw err;
    res.json({ message: "User updated successfully!" });
  });
});

// ✅ DELETE - Delete user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE user_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: "User deleted successfully!" });
  });
});

// ✅ Simple Home Route
app.get('/', (req, res) => {
  res.send("<h1>Welcome to Express + MySQL CRUD API</h1>");
});

// ✅ Start Server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
