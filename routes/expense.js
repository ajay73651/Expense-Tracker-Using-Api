const express = require('express');
const expenseController = require('../controller/expense');
const Router = express.Router();

// API to add expense
Router.post("/add-expense", expenseController.addExpense);

// API to get all expense
Router.get("/get-expenses", expenseController.getAllExpenses);

// API to get a expense by id
Router.get("/expense/:id", expenseController.getExpenseByID);

// API to Edit a expense
Router.put("/update-expense/:id", expenseController.updateExpenseByID);

// API to delete a expense
Router.delete("/delete-expense/:id", expenseController.deleteExpenseByID);

module.exports = Router;
