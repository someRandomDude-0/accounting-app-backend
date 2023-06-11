const Transaction = require("../models/transactionModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addTransaction = catchAsync(async (req, res, next) => {
  const { date, account_name, transaction_type, amount, user_id } = req.body;

  const { id } = req.params;

  if (!date || !account_name || !transaction_type || !amount || !id)
    return next(new AppError("Please provide valid data", 400));

  const transaction = await Transaction.create({
    date,
    account_name,
    transaction_type,
    account_id: id,
    amount,
    user_id
  });

  if (!transaction)
    return next(
      new AppError("couldn't create transaction please try again", 400)
    );

  res.status(201).json({
    status: "success",
    data: { transaction },
  });
});


exports.getAllTransactions = catchAsync(async (req,res,next) => {
  const {id} = req.params;

  const transactions = await Transaction.find({ user_id: id})

  if (!transactions)
  return next(
    new AppError("couldn't find any transaction please try again", 400)
  );

  res.status(200).json({
    status: "success",
    data: { transactions },
  });
})