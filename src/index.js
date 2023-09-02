const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const atmModel = require("./model/atmModel");
const port = 3001;

const app = express();

app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://chandan:Chandan%40q23@cluster0.nrci4xc.mongodb.net/atmData?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Endpoint to simulate card swipe
app.post('/swipeCard', async (req, res) => {
    const cardNumber = req.body.cardNumber;
    
    const account = await atmModel.findOne({ cardNumber: cardNumber });
  
    if (account) {
      res.json({ status: 'success', message: 'Card exists. Please enter PIN.' });
    } else {
      res.json({ status: 'error', message: 'Card does not exist.' });
    }
  });

app.get("/test",function (req,res){
    res.send("app is running ")
})

app.post('/withdraw', async (req, res) => {
    const cardNumber = req.body.cardNumber;
    const pin = req.body.pin;
    const amount = req.body.amount;
  
    try {
      const account = await atmModel.findOne({ cardNumber: cardNumber, pin: pin });
  
      if (account) {
        if (account.balance >= amount) {
          account.balance -= amount;
          // Update the balance in the database
          await account.save();
          
          // Log the transaction or perform any other necessary actions here
          
          res.json({ status: 'success', message: 'Withdrawal successful', balance: account.balance });
        } else {
          res.json({ status: 'error', message: 'Insufficient balance' });
        }
      } else {
        res.json({ status: 'error', message: 'Invalid PIN or Card Number' });
      }
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  });


app.listen(port, function () {
  console.log("Server is running on port " + port);
});
