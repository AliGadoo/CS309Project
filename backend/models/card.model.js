const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cardSchema = new Schema({
     object : [] 
    } ,

  {timestamps: true}
); 

module.exports = moongoose.model("Card", cardSchema)
