import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  const allowedOrigin = 'http://localhost:5173';
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

const requireAuth = (req, res, next) => {
  if (req.headers.authorization !== '123456') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

app.use(requireAuth);

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'to_do_list_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const toDateString = (value) => {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value);
};

const mapTask = (row) => ({
  _id: String(row.id),
  name: row.name,
  description: row.description ?? '',
  duedate: toDateString(row.due_date),
});

const mapGoal = (row) => ({
  _id: String(row.id),
  name: row.name,
  description: row.description ?? '',
  duedate: toDateString(row.due_date),
});

const getTaskById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows[0] || null;
};

const getGoalById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM goals WHERE id = ?', [id]);
  return rows[0] || null;
};

app.get('/tasks/getTasks', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
    res.json(rows.map(mapTask));
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.post('/tasks/addTask', async (req, res) => {
  try {
    const { name, description, duedate } = req.body;

    if (!name || !description || !duedate) {
      return res.status(400).json({ error: 'name, description and duedate are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO tasks (name, description, due_date) VALUES (?, ?, ?)',
      [name, description, duedate]
    );

    const created = await getTaskById(result.insertId);
    res.status(201).json(mapTask(created));
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Failed to add task' });
  }
});

app.delete('/tasks/removeTask/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error removing task:', error);
    res.status(500).json({ error: 'Failed to remove task' });
  }
});

app.get('/goals/getGoals', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM goals ORDER BY id DESC');
    res.json(rows.map(mapGoal));
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ error: 'Failed to fetch goals' });
  }
});

app.post('/goals/addGoal', async (req, res) => {
  try {
    const { name, description, duedate } = req.body;

    if (!name || !description || !duedate) {
      return res.status(400).json({ error: 'name, description and duedate are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO goals (name, description, due_date) VALUES (?, ?, ?)',
      [name, description, duedate]
    );

    const created = await getGoalById(result.insertId);
    res.status(201).json(mapGoal(created));
  } catch (error) {
    console.error('Error adding goal:', error);
    res.status(500).json({ error: 'Failed to add goal' });
  }
});

app.delete('/goals/removeGoal/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    await pool.query('DELETE FROM goals WHERE id = ?', [id]);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error removing goal:', error);
    res.status(500).json({ error: 'Failed to remove goal' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend listening on http://0.0.0.0:${PORT}`);
});
