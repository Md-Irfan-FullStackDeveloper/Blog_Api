const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/User.model");
require("dotenv").config();

const authentication = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const { email } = decode;
    const userExist = await UserModel.findOne({ email });

    if (!userExist) {
        res.status(400).json({ msg: "user not found" });
    }
    next();
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

module.exports = { authentication };
