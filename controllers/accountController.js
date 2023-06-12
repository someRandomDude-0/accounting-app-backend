const Account = require("../models/accountModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addAccount = catchAsync(async (req, res, next) => {
  const { account_name, account_type, user_id, balance_type } = req.body;

  if (!account_name || !account_type || !balance_type || !user_id)
    return next(new AppError("Please provide valid data", 400));

  const account = await Account.create({
    account_name,
    account_type,
    balance_type,
    user_id,
  });

  if (!account)
    return next(new AppError("couldn't create account please try again", 400));

  res.status(201).json({
    status: "success",
    data: { account },
  });
});

exports.getAllAccounts = catchAsync(async (req, res, next) => {
  const user_id = req.params.id;

  const accounts = await Account.find({ user_id });

  if (!accounts)
    return next(
      new AppError("couldn't get the accounts please try again", 500)
    );

  res.status(201).json({
    status: "success",
    data: { accounts },
  });
});

exports.updateAccountBalance = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { amount, transaction_type } = req.body;

  const account = await Account.findById(id);

  if (!account)
    return next(
      new AppError("couldn't find the account please try again"),
      404
    );

  // {
  //   _id: new ObjectId("648700287b92d64b4ef7bf13"),
  //   account_name: 'Cash',
  //   account_type: 'asset-account',
  //   balance_type: 'debit',
  //   balance: 0,
  //   user_id: new ObjectId("64849e11ad5fe7eb568d8264"),
  //   __v: 0
  // }

  if (account.balance_type === transaction_type.toLowerCase()) {
    account.balance += amount;
  } else {
    account.balance -= amount;
  }

  // debit debit
  // debit credit

  // credit debit
  // credit credit

  await account.save();

  res.status(200).json({
    status: "success",
  });
});
