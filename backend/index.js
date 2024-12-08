const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user.model");
const Product = require("./models/product.model");
const mongodbURL = "mongodb://localhost:27017/";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log("connection to database failed", err);
  });

//    signup     //

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);

    if (await User.findOne({ email: user.email })) {
      return res.json({ success: false, message: "This email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    res.json({
      success: true,
      message: "user added successfully",
      user: user,
    });
  } catch (err) {
    return res.json({ success: false, message: "something went wrong" });
  }
});
//     add product      //

app.post("/addProduct", async (req, res) => {
  try {
    const product = new Product(req.body);

    if (await Product.findOne({ name: product.name })) {
      // we will add logic if this product exist add 1 more on the stock of this product
    }
    await product.save();
    res.json({
      success: true,
      message: "product added successfully",
    });
  } catch (err) {
    return res.json({ success: false, message: "something went wrong" });
  }
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(5000, () => {
  console.log("app listening at 5000 port");
});
