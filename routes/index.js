const LoginController = require('../src/controllers/LoginController');
const CategoryController = require('../src/controllers/CategoryController');
const ExpenseController = require('../src/controllers/ExpensesController');

module.exports = (app) => {
    app.post('/CreateUser',LoginController.createUser);
    app.post('/Login', LoginController.login);
    app.post('/CreateCategory', CategoryController.addCategory);
    app.post('/Category/Index',CategoryController.index);
    app.post('/ExpenseCreate',ExpenseController.addExpense);
    app.post('/ExpenseIndex',ExpenseController.index);
}