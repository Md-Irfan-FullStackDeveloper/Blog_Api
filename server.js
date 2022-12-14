const express = require("express");
require("dotenv").config();
const connection = require("./config/db");
const { blogRouter } = require("./Routes/blog.route");
const { userRouter } = require("./Routes/user.route");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Api homepage");
});

app.use("/api/user", userRouter);

app.use("/api/blog", blogRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to db successfully");
  } catch (error) {
    console.log("Connecting to db failed");
    console.log(error);
  }
});
