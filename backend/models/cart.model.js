const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = new Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    productIDs: { type: [mongoose.Schema.Types.ObjectId] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cartSchema);
