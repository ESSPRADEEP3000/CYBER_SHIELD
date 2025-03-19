// firewall-module-backend/src/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// User schema definition
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // Hash password with 10 salt rounds
  }
  next();
});

// Method to compare input password with stored hashed password
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
