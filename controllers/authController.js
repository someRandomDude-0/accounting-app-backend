const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  if (!user) return next(new AppError('User already exist', 401))

  res.status(401).json({
    status: 'success',
    data: { user },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(
      new AppError('Please provide email and password', 400)
    );

  const user = await User.findOne({ email }).select('+password'); //  explicitly defining to return password fields which by default is "select: false" in user Model

  if (
    !user ||
    user.password !== password
  ) {
    return next(new AppError('Incorrect email or password', 401));
  }

  res.status(401).json({
    status: 'success',
    data: { user },
  });
});