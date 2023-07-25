const mongoose = require("mongoose");

const closingEntrySchema = new mongoose.Schema({
  creditAccounts: [
    {
      amount: {
        type: Number,
        required: true,
      },
      creditAccount: {
        type: String,
        required: true,
      },
      _id: {
        type: String,
        required: true,
      },
    },
  ],
  debitAccounts: [
    {
      amount: {
        type: Number,
        required: true,
      },
      debitAccount: {
        type: String,
        required: true,
      },
      _id: {
        type: String,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const ClosingEntry = mongoose.model("ClosingEntry", closingEntrySchema);

module.exports = ClosingEntry;
