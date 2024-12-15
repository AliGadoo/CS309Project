const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const User = require("./models/user.model");
const Product = require("./models/product.model");
const Cart = require("./models/cart.model");
const mongodbURL = "mongodb://localhost:27017/CS309Project";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

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
//   login   //
app.post(`/login`, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ success: false, message: "this email not found" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ success: false, message: "wrong password" });
    }
    return res.json({
      success: true,
      message: "user logged in successfully",
      user: user,
    });
  } catch (err) {
    return res.json({ success: false, message: "something went wrong" });
  }
});

// delete user //

app.delete("/deleteUser", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const user = await User.findOneAndDelete({ email: userEmail });

    if (!res) {
      return res.json({ success: false, message: "user not found" });
    }

    res.json({ success: true, message: "user deleted successfully" });
  } catch (err) {
    return res.json({ success: false, message: "something went wrong" });
  }
});

//  update user //

app.patch("/updateUser", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const updatedData = {};

    if (req.body.password) {
      if (
        !req.body.confirmPassword ||
        req.body.password !== req.body.confirmPassword
      ) {
        return res.json({
          success: false,
          message: "passwords do not match confirmPassword",
        });
      }
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(req.body.password, salt);
    }

    // الطريقة طويلة لكن انا هندلتها بالطريقة دي عشان انا مش عارف
    //اليوزر عايز يحدث اني اتربيوت بالظبط فانا لازم اشوف هو باعت يحدث اي واحدثهولة //

    if (req.body.name) {
      updatedData.name = req.body.name;
    }

    if (req.body.address) {
      updatedData.address = req.body.address;
    }
    if (req.body.image) {
      updatedData.image = req.body.image;
    }
    if (req.body.phone) {
      updatedData.phone = req.body.phone;
    }

    await User.updateOne(user, updatedData);
    res.json({ success: true, message: "user updated successfully" });
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

app.get(`/allProducts`, async (req, res) => {
  try {
    const products = await Product.find();
    if (!products.length) {
      return res.json({ success: false, message: "there are no products yet" });
    }
    res.json({ success: true, products: products });
  } catch (err) {
    return res.json({ success: false, message: "something went wrong" });
  }
});

app.get(`/product/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ success: false, message: "Invalid product ID" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.json({
        success: false,
        message: "there is no product with this id",
      });
    }
    res.json({ success: true, product: product });
  } catch (err) {
    return res.json({ success: false, message: "something went wrong" });
  }
});

app.get(`/products/:category`, async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category: category });
    if (!products.length) {
      return res.json({
        success: false,
        message: "there is no products with this category",
      });
    }
    res.json({ success: true, products: products });
  } catch (err) {
    return res.json({ success: false, message: "something went wrong" });
  }
});

app.delete(`/product/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ success: false, message: "Invalid product ID" });
    }
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.json({
        success: false,
        message: "there is no product with this id",
      });
    }
    res.json({ success: true, message: "the product has been deleted" });
  } catch (err) {
    return res.json({ success: false, message: "something went wrong" });
  }
});

app.patch(`/editProduct/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ success: false, message: "Invalid product ID" });
    }

    await Product.updateOne({ _id: id }, { $set: updates });
    const updatedProduct = await Product.findById(id);
    res.json({ success: true, product: updatedProduct });
  } catch (err) {
    return res.json({ success: false, message: "something went wrong" });
  }
});

app.post(`/pushInCart`, async (req, res) => {
  try {
    const { userID, productID, count } = req.body;
    if (!userID || !productID || !count) {
      return res.json({ success: false, message: "Invalid input" });
    }
    const product = await Product.findById(productID);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }
    const stock = product.stock;
    let cart = await Cart.findOne({ userID });
    if (!cart) {
      cart = new Cart({ userID, products: [] });
    }

    const existingProduct = cart.products.find(
      (item) => item.productID.toString() === productID
    );

    if (existingProduct) {
      if (existingProduct.count + count > stock) {
        return res.json({
          success: false,
          message: "your order mount exceeds stock",
        });
      }
      existingProduct.count += count;
    } else {
      if (count > stock) {
        return res.json({
          success: false,
          message: "your order mount exceeds stock",
        });
      }
      cart.products.push({ productID, count });
    }
    await cart.save();
    return res.json({ success: true, cart });
  } catch (err) {
    return res.json({ success: false, message: "something went wrong" });
  }
});

app.delete(`/deleteFromCart`, async (req, res) => {
  try {
    const { userID, productID } = req.body;
    if (!userID || !productID) {
      return res.json({ success: false, message: "Invalid input" });
    }
    const cart = await Cart.findOne({ userID });
    if (!cart) {
      return res.json({ success: false, message: "Cart not found" });
    }
    const updatedProducts = cart.products.filter(
      (product) => product.productID.toString() !== productID
    );
    if (updatedProducts.length === cart.products.length) {
      return res.json({ success: false, message: "Product not found in cart" });
    }
    cart.products = updatedProducts;
    await cart.save();

    return res.json({ success: true, cart });
  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: "Something went wrong" });
  }
}); 

  // get all cart products for specific usrer id // 
  
  app.get("/getCart/:userID", async (req, res) => {
    try {
      const userID = req.params.userID;
      const cart = await Cart.findOne({ userID }) ;

      const productsID = cart.products.map((product) => product.productID);  

      const products =  productsID.map(async (productID) =>{
        const product = await Product.findById(productID);
        return product ;
      }) 

     res.json({ success: true, products: await Promise.all(products) });

 
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
