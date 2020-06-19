const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

const data = require("./data");

//Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Everything is working!");
});

app.get("/api/products", (req, res) => {
  res.json(data);
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await data.find((x) => x._id === req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port no ${port}`);
});
