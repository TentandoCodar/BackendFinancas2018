const LoginController = require('../src/controllers/LoginController');
const CategoryController = require('../src/controllers/CategoryController');
const ExpenseController = require('../src/controllers/ExpensesController');
//Rotas com suas respectivas funções.
module.exports = (app) => {
    app.post('/CreateUser',LoginController.createUser);
    app.post('/Login', LoginController.login);
    app.post('/Destroy',LoginController.destroyToken);
    app.post('/CreateCategory', CategoryController.addCategory);
    app.post('/Category/Index',CategoryController.index);
    app.post('/Category/Update',CategoryController.update);
    app.post('/Category/Delete',CategoryController.delete);
    app.post('/ExpenseCreate',ExpenseController.addExpense);
    app.post('/ExpenseIndex',ExpenseController.index);
}