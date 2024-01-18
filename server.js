const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const User = require('./User');

const app = express();
// Sử dụng middleware để phân tích cú pháp dữ liệu JSON
app.use(express.json());
const port = 3000;

// Kết nối MongoDB
const uri = "mongodb+srv://admin:admin@firstdbgame.m27jtch.mongodb.net/mydatabase?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Đăng ký người dùng
app.post('/register', async (req, res) => {
  const { playerName } = req.body;
  const existingUser = await User.findOne({ playerName });
  if (existingUser) {
    return res.status(200).send('User already exists!');
  }
  // Lưu thông tin người dùng vào MongoDB
  const newplayer = new User( {playerName} );
 
  newplayer.save()
    .then(result => {
      console.log('User saved successfully:', result);
      return res.status(200).send('player registered successfully!');
    })
    .catch(error => {
      console.error('Error saving user:', error);
      return res.status(500).send(err);
    });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));