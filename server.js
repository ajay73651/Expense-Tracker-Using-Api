const express = require("express");
const path = require("path");
const app = express();

const bodyParser = require('body-parser');

const sequelize = require("./config");

const cors = require("cors");

// Middleware to parse JSON data from incoming requests
app.use(express.json());

// Allow all origins for CORS 
app.use(cors());

// static files
app.use(express.static("public"));

const expenseRoutes = require('./routes/expense');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the expense routes
app.use('/api', expenseRoutes); // Prefix with '/api'

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});
