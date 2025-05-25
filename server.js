const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://nasih_chevapra:nasih%40MongoDB00@cluster0.hj7x5to.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const ItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

const Item = mongoose.model('Item', ItemSchema);

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  io.emit('item_added', item); // real-time update
  res.status(201).json(item);
});

io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
