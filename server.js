const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';
const multer = require('multer');
const path = require('path');
const router = express.Router();
const app = express();
const port = 3001;
require('dotenv').config();
// const addToCartRoutes = require('./routes/add-to-cart');
const userRoutes = require('./routes/users');
const userRouter = require('./router/reports');



// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:8080',
  methods: 'GET, POST, DELETE, PUT',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use('/uploads', express.static(path.join(__dirname, 'upload')));
// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbpiwa'
  
});

// Use promise wrapper
const dbPromise = db.promise();

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});
// Admin register route
app.post('/admin/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if admin with the same email already exists
  db.query('SELECT * FROM admins WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database query error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin into the database
    db.query(
      'INSERT INTO admins (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error registering admin' });
        }

        res.status(201).json({ message: 'Admin registered successfully' });
      }
    );
  });
});

app.post('/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const query = 'SELECT * FROM admins WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const admin = results[0];

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.id, email: admin.email }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful.', token });
  });
});

//items
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, 'upload/'); // Save to the uploads directory
  },
  filename: function(req,file, cb){
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.get('/pending-items', (req, res) => {
  const sql = 'SELECT * FROM items WHERE status = "pending"';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching pending items:', err);
      return res.status(500).send('Error fetching pending items.');
    }

    // Create an array of items with image URLs
    const itemsWithUrls = results.map(item => ({
      ...item,
      imageUrl: `http://localhost:3001/uploads/${path.basename(item.image_path)}` // Construct the image URL
    }));

    res.json(itemsWithUrls); // Send the modified items as a response
  });
});

// Approve product
app.post('/approved-items', (req, res) => {
  const { itemId } = req.body;
  const sql = 'UPDATE items SET status = "approved" WHERE id = ?';
  db.query(sql, [itemId], (err, result) => {
    if (err) {
      console.error('Error approving product:', err);
      res.status(500).send('Error approving product.');
    } else {
      res.json({ message: 'Product approved successfully.' });
    }
  });
});

// Reject product
app.post('/reject-item', (req, res) => {
  const { itemId } = req.body;
  const sql = 'UPDATE items SET status = "rejected" WHERE id = ?';
  db.query(sql, [itemId], (err, result) => {
    if (err) {
      console.error('Error rejecting product:', err);
      res.status(500).send('Error rejecting product.');
    } else {
      res.json({ message: 'Product rejected successfully.' });
    }
  });
});

app.post('/add-item', upload.single('image'), (req, res) => {
  const { name, description, price, category, userFullName } = req.body;
  
  const imagePath = req.file.path; // Use this if you're storing the image path
  const sql = 'INSERT INTO items (name, description, price, category,userFullName,  image_path) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, description, price, category, userFullName, imagePath], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, name, description, price, category, userFullName, imagePath });
  });
});

app.get('/approved-itemss', (req, res) => {
  const sql = 'SELECT * FROM items WHERE status = "approved"'; // Correct SQL query

  db.query(sql, (err, results) => { // Use 'results' as returned by the query
    if (err) {
      console.error('Error fetching approved products:', err);
      return res.status(500).send('Error fetching approved products.');
    }
    
    // Create an array of items with image URLs
    const itemsWithUrls = results.map(item => ({
      ...item,
      imageUrl: `http://localhost:3001/uploads/${path.basename(item.image_path)}` // Correctly set the image URL
    }));

    res.json(itemsWithUrls); // Send the modified items as a response
  });
});


app.get('/item/:id', (req, res) => {
  const itemId = req.params.id;

  // Ensure productId is defined
  if (!itemId) {
    return res.status(400).json({ error: 'Product ID is missing' });
  }

  // Query the database for the product with the given id
  const query = 'SELECT * FROM items WHERE id = ?';
  db.query(query, [itemId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Modify the result to add the imageUrl
    const itemWithUrl = {
      ...result[0],
      imageUrl: `http://localhost:3001/uploads/${path.basename(result[0].image_path)}`
    };

    // Send the modified product as a response
    res.json(itemWithUrl);
  });
});

app.delete('/remove-item/:id', (req, res) => {
  const itemId = req.params.id; // Retrieve the item ID from the request parameters
  const sql = 'DELETE FROM items WHERE id = ?';
  
  db.query(sql, [itemId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item removed successfully' });
  });
});

//CART 
app.post('/api/add-to-cart', (req, res) => {
  const { user_id, name, quantity, price, image_path } = req.body;

  const query = `
    INSERT INTO cart (user_id, name, quantity, price, image_path)
    VALUES (?, ?, ?, ?, ?)`;
  
  db.query(query, [user_id, name, quantity, price, image_path], (error, results) => {
    if (error) {
      console.error('Error inserting into cart:', error);
      return res.status(500).json({ message: 'Error adding item to cart' });
    }
    
    res.status(201).json({ message: 'Item added to cart', id: results.insertId });
  });
});

app.get('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT * FROM cart WHERE user_id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      return res.status(500).json({ error: 'Failed to fetch cart items' });
    }

    // Modify each result to include the imageUrl field
    const modifiedResults = results.map(item => {
      return {
        ...item,
        imageUrl: `http://localhost:3001/uploads/${path.basename(item.image_path)}`
      };
    });

    // Send the modified cart items as a response
    res.json(modifiedResults);
  });
});

app.delete('/api/cart/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const sql = 'DELETE FROM cart WHERE id = ?';
  db.query(sql, [itemId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item removed successfully' });
  });
});

app.post('/api/buy-now', (req, res) => {
  const purchaseData = req.body;

  // Validate JWT token (optional)
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { user_id, productId, name, quantity, total_price, image_path } = purchaseData;

    // Insert purchase data into the database
    const query = 'INSERT INTO orders (user_id, product_id, name, quantity, total_price, image_path) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [user_id, productId, name, quantity, total_price, image_path];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting purchase data:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.status(200).json({ message: 'Purchase successful', orderId: result.insertId });
    });
  });
});

app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  const { id } = req.params;
  const { fullName, phone, address } = req.body;

  try {
    const result = await db.execute(
      'UPDATE users SET fullName = ?, phone = ?, address = ? WHERE id = ?',
      [fullName, phone, address, id]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Create a new user
// Update an existing user
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { fullName, phone, address, email } = req.body;

  if (!fullName || !phone || !address || !email) {
      return res.status(400).send('All fields are required');
  }

  // Update the user's information
  const sql = 'UPDATE users SET fullName = ?, phone = ?, address = ?, email = ? WHERE id = ?';
  const values = [fullName, phone, address, email, id];

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error updating user:', err);
          return res.status(500).send('Server error');
      }

      res.send('User updated successfully');
  });
});


app.use('/api/users', userRoutes);
app.use('/api/report', userRouter);
app.use(express.json());
// app.use('/api', addToCartRoutes); 
app.use(express.urlencoded({ extended: true }));
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); 