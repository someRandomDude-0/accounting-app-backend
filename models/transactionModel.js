const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "Please provide a date"],
  },
  account_name: {
    type: String,
    required: [true, "Please provide an account name"],
  },
  transaction_type: {
    type: String,
    enum: ["Debit", "Credit"],
    required: [true, "Please provide the transaction type"],
  },
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide an account id"],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide a user id"],
  },
  amount: {
    type: Number,
    required: [true, "Please provide an amount"],
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
