const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');

const router = express();

// Middleware
router.use(cors());
router.use(bodyParser.json());

// MySQL connection
const dbConfig = {
  host: 'localhost', // Your MySQL host
  user: 'root', // Your MySQL user
  password: 'your_password', // Your MySQL password
  database: 'dbpiwa', // Your database name
};

// Get all reported users
router.get('/reports', async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  try {
    const [reports] = await connection.query('SELECT * FROM reports');
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  } finally {
    await connection.end();
  }
});

// Approve a report
router.post('/reports/approve', async (req, res) => {
  const { id } = req.body;
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.query('UPDATE reports SET status = "approved" WHERE id = ?', [id]);
    res.json({ message: 'Report approved' });
  } catch (error) {
    console.error('Error approving report:', error);
    res.status(500).json({ error: 'Failed to approve report' });
  } finally {
    await connection.end();
  }
});

// Reject a report
router.post('/reports/reject', async (req, res) => {
  const { id } = req.body;
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.query('UPDATE reports SET status = "rejected" WHERE id = ?', [id]);
    res.json({ message: 'Report rejected' });
  } catch (error) {
    console.error('Error rejecting report:', error);
    res.status(500).json({ error: 'Failed to reject report' });
  } finally {
    await connection.end();
  }
});

// Ban a user
router.post('/users/ban', async (req, res) => {
  const { username } = req.body;
  const connection = await mysql.createConnection(dbConfig);
  try {
    await connection.query('UPDATE users SET status = "banned" WHERE username = ?', [username]);
    res.json({ message: `User ${username} banned` });
  } catch (error) {
    console.error('Error banning user:', error);
    res.status(500).json({ error: 'Failed to ban user' });
  } finally {
    await connection.end();
  }
});



module.exports = router;