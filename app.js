const express = require("express");
const cors = require("cors");

const authController = require("./controllers/authController.js");
const accountController = require("./controllers/accountController.js");
const transactionController = require("./controllers/transactionController.js");
const entryController = require("./controllers/entryController.js");
const closingEntryController = require("./controllers/closingEntryController.js")

const app = express();

app.use(cors());
app.use(express.json());

app.post("/signup", authController.signup);
app.post("/login", authController.login);

app.post("/accounts", accountController.addAccount);
app.get("/users/:id/accounts", accountController.getAllAccounts);
app.patch("/accounts/:id", accountController.updateAccountBalance);
app.patch("/accounts/zero/:id", accountController.zeroAccountBalance);

app.post("/accounts/:id/transactions", transactionController.addTransaction);
app.get("/users/:id/transactions", transactionController.getAllTransactions);

app.post("/users/entry", entryController.addEntry);
app.get("/users/:id/entry", entryController.getAllEntries);

app.post("/users/closingentry", closingEntryController.addEntry);
app.get("/users/:id/closingentry", closingEntryController.getAllEntries);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Route does not exist",
  });
});

module.exports = app
