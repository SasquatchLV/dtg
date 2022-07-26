const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const roles = Object.values(user.roles).filter(Boolean);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, roles });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// give admin
const promoteUser = async (req, res) => {
  try {
    const { email } = req.params;

    await User.promote(email);

    res.status(200).json({ email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// remove admin
const demoteUser = async (req, res) => {
  try {
    const { email } = req.params;

    await User.demote(email);

    res.status(200).json({ email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete admin
const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;

    await User.delete(email);

    res.status(200).json({ email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) return res.status(204).json({ error: "No users found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get single user
const getSingleUser = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.single(email);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "No user found" });
  }
};

module.exports = {
  signupUser,
  loginUser,
  promoteUser,
  demoteUser,
  getAllUsers,
  getSingleUser,
  deleteUser
};
