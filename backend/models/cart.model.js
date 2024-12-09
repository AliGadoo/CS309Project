const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = new Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: [
      {
        productID: { type: mongoose.Schema.Types.ObjectId, required: true },
        count: { type: Number, required: true, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
