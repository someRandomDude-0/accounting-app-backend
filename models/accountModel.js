const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  account_name: {
    type: String,
    required: [true, "Please provide an account name"],
  },
  account_type: {
    type: String,
    required: [true, "Please provide an account type"],
  },
  balance_type: {
    type: String,
    required: [true, "Please provide a balance type"],
  },
  balance: {
    type: Number,
    default: 0,
  },
  belongs_to: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide a user id"],
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;