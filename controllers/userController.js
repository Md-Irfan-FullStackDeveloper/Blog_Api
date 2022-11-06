const { UserModel } = require("../Models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const getAllUsers = async (req, res) => {
  let allUsers;
  try {
    allUsers = await UserModel.find()
  } catch (error) {
    console.log(error);
    return res.status(404).json({msg: 'users not found'})
  }

  if(!allUsers) {
    return res.status(400).json({msg: "users not found"})
  }

  return res.status(200).json({allUsers})

}

const addUsers = async (req, res) => {
  const { name, email, password } = req.body;
  let userExist;

  try {
    userExist = await UserModel.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (userExist) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const hashed_password = bcrypt.hashSync(password, 5);
  const newUser = new UserModel({
    name,
    email,
    password: hashed_password,
    blogs: []
  });

  try {
    await newUser.save();
    return res.status(201).json({ newUser });
  } catch (error) {
    return console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let userExist;

  try {
    userExist = await UserModel.findOne({ email });
  } catch (error) {
    return res.status(400).json({msg: error});
  }

  if (!userExist) {
    return res.status(404).json({ msg: "User cannot found" });
  }

  const checkPassword = bcrypt.compareSync(password, userExist.password);
  if (!checkPassword) {
    return res.status(400).json({ msg: "Incorrect password" });
  }

  const token = jwt.sign({ email: email }, process.env.SECRET_KEY);
  return res.status(200).json({ msg: "Login successful", token });
};

module.exports = {
  addUsers,
  login,
  getAllUsers
};
