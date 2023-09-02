const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  accountNumber:{
    type:String,
    required:true,
  },
  
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  pin: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
},{timeStamps:true});

module.exports = mongoose.model("Card", cardSchema);
