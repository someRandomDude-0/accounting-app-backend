const express = require("express");
const cors = require("cors");

const authController = require("./controllers/authController.js");
const accountController = require("./controllers/accountController.js");
const transactionController = require("./controllers/transactionController.js");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/signup", authController.signup);
app.post("/login", authController.login);

app.post("/accounts", accountController.addAccount);
app.get("/users/:id/accounts", accountController.getAllAccounts);

app.post("/accounts/:id/transactions", transactionController.addTransaction);
app.get("/users/:id/transactions", transactionController.getAllTransactions);


app.all("*", (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route does not exist'
  })
})

module.exports = app;
