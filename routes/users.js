const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const SECRET_KEY = 'your_secret_key';


// const User = require('../models/User'); 
// MySQL connection (you can move this to a separate file if needed)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbpiwa'
});
const dbPromise = db.promise();

// User Registration
router.post('/register', async (req, res) => {
  const { fullName, email, dob, phone, address, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (fullName, email, dob, phone, address, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const [results] = await dbPromise.query(query, [fullName, email, dob, phone, address, username, hashedPassword]);

    res.json({ success: true, message: 'Registration successful!' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'Internal server error during registration.' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [results] = await dbPromise.query(query, [username]);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Generate JWT token with role included
      const token = jwt.sign({ userId: user.id, fullName: user.fullName, role: user.role }, SECRET_KEY, { expiresIn: '10h' });

      return res.status(200).json({ 
        success: true, 
        token, 
        role: user.role // Return role in response for frontend routing
      });
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get All Users
router.get('/users', (req, res) => {
  
  const query = 'SELECT * FROM users'; // Adjust the table name if necessary
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'Failed to fetch users' });
    } else {
      res.json(results);
    }
  });
});

router.get('/messages/:chatId', async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const [messages] = await db.execute('SELECT * FROM messages WHERE chat_id = ?', [chatId]);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Save message
router.post('/messages', async (req, res) => {
  const { senderId, receiverId, text, chatId } = req.body;
  try {
    const result = await db.execute('INSERT INTO messages (sender_id, receiver_id, text, chat_id) VALUES (?, ?, ?, ?)', [senderId, receiverId, text, chatId]);
    res.status(201).json({ id: result.insertId, senderId, receiverId, text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});
module.exports = router;