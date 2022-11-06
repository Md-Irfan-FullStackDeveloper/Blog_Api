const { Router } = require("express");
const { addUsers, login, getAllUsers } = require("../controllers/userController");

const userRouter = Router();

userRouter.get('/', getAllUsers)
userRouter.post("/signup", addUsers);
userRouter.post("/login", login);

module.exports = {
  userRouter,
};
