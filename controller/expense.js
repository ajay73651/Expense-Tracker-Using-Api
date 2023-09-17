const User = require("../models/User");

exports.addExpense = async (req, res, next) => {
  try {
    const { fullname, email, phone } = req.body;
    const newUser = await User.create({
      fullname,
      email,
      phone,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create user" });
  }
};

exports.getAllExpenses = async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve users" });
  }
};

exports.getExpenseByID = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve user" });
  }
};

exports.updateExpenseByID = async (req, res, next) => {
  try {
    const { fullname, email, phone } = req.body;
    const updatedUser = await User.update(
      { fullname, email, phone },
      { where: { id: req.params.id } }
    );
    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update user" });
  }
};

exports.deleteExpenseByID = async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete user" });
  }
};
