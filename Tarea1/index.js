const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Connect to PostgreSQL database
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'todo_db',
  password: 'your_password',
  port: 5432,
});

app.use(bodyParser.json());

// GET all tasks
app.get('/tasks', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
  res.status(200).json(result.rows);
});

// GET a single task by ID
app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  res.status(200).json(result.rows[0]);
});

// POST a new task
app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  const result = await pool.query('INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *', [title, description]);
  res.status(201).json(result.rows[0]);
});

// PUT (update) a task by ID
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const result = await pool.query('UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *', [title, description, completed, id]);
  res.status(200).json(result.rows[0]);
});

// DELETE a task by ID
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
