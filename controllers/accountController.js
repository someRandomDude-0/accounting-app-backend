const Account = require("../models/accountModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addAccount = catchAsync(async (req, res, next) => {
  const { account_name, account_type, user_id } = req.body;

  if (!account_name || !account_type || !user_id)
    return next(new AppError("Please provide valid data", 400));

  const account = await Account.create({
    account_name,
    account_type,
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
  const user_id = req.params.id

  const accounts = await Account.find({ user_id })

  if(!accounts) return next(new AppError('couldn\'t get the accounts please try again', 500))

  res.status(201).json({
    status: "success",
    data: { accounts },
  });
});
