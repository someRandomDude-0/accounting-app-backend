const express = require("express");
const cors = require('cors')

const authController = require('./controllers/authController.js')

const app = express();

app.use(cors())
app.use(express.json());

app.post('/signup', authController.signup)
app.post('/login', authController.login)

module.exports = app