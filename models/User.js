const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  providerID: {
    type: String,
    unique: true
  },
  nickname: {
    type: String,
  },
  name: {
    type: String
  },
  surname: {
    type: String
  },
  provider: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;