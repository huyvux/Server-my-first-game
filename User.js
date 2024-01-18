const mongoose = require('mongoose');

// Định nghĩa schema cho mô hình User
const userSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
    unique: true,
  }
});

// Tạo mô hình User từ schema
const User = mongoose.model('User', userSchema);

// Xuất class User để sử dụng ở những nơi khác trong ứng dụng
module.exports = User;