const Sequelize = require('sequelize');
const sequelize = require('../config');

const Expense = sequelize.define('expense', {
  fullname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },
  phone: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    unique: false,
  }
});

module.exports = Expense;
