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
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please provide a user id"],
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;