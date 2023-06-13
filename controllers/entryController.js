const Entry = require("../models/entryModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addEntry = catchAsync(async (req, res, next) => {
  const { creditAccounts, debitAccounts, date, description, user_id } =
    req.body;

  if (
    !creditAccounts ||
    creditAccounts.length === 0 ||
    !debitAccounts ||
    debitAccounts.length === 0 ||
    !date ||
    !description ||
    !user_id
  )
    return next(new AppError("Please provide valid data", 400));

  const entry = await Entry.create({
    creditAccounts,
    debitAccounts,
    date,
    description,
    user_id,
  });

  if (!entry)
    return next(new AppError("couldn't create entry please try again", 400));

  res.status(201).json({
    status: "success",
    data: { entry },
  });
});

exports.getAllEntries = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const entries = await Entry.find({ user_id: id });

  if (!entries)
    return next(new AppError("couldn't find any Entry please try again", 400));

  res.status(200).json({
    status: "success",
    data: { entries },
  });
});
