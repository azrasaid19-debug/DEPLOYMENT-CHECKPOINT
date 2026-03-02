const mongoose = require("mongoose");

// This defines how a User will look inside MongoDB
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // name is required
  },
  email: {
    type: String,
    required: true, // email is required
  },
  age: {
    type: Number,
  },
});

// Export the model so we can use it in server.js
module.exports = mongoose.model("User", UserSchema);
