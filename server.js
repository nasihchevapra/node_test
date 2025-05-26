//mongodb+srv://nasih_chevapra:nasih%40MongoDB00@cluster0.hj7x5to.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0e
const Item = require('./models/item');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://nasih_chevapra:nasih%40MongoDB00@cluster0.hj7x5to.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0e")
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const itemRoutes = require('./routes/items');
app.use('/items', itemRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('API is working ✅');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
