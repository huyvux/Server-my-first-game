const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

const app = express();
const port = 3000;

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Định nghĩa mô hình người dùng
const playerSchema = new mongoose.Schema({
  playername: String
});
const player = mongoose.model('player', playerSchema);

// Đăng ký người dùng
app.post('/register', upload.single('profileImage'), async (req, res) => {
  const { playerName } = req.body;

  const existingUser = await User.findOne({ playerName });
  if (existingUser) {
    return res.status(200).send('User already exists!');
  }

  // Lưu thông tin người dùng vào MongoDB
  const newplayer = new player({ playerName });
  newplayer.save((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send('player registered successfully!');
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));