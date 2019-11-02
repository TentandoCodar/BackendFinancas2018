const Expenses = require('../../models/Expenses');
const Category = require('../../models/Category');
const sequelize = require('sequelize');
const Sequelize = new sequelize('CMS','root','', {
    host: '127.0.0.1',
    dialect: 'mysql',
});
const OP = sequelize.Op;


module.exports = {
    
    async index(req,res) {

        //Pegar todos os dados que devem aparecer no dashboard
        const thisMonth =  new Date().getFullYear + '-' + (new Date().getMonth() + 1).toString()  + '-01' + ' 03:00:00' ;
        const nextMounth = new Date().getFullYear + '-' + (new Date().getMonth() + 2).toString()  + '-01' + ' 03:00:00' ;
        console.log(thisMonth);
        console.log(nextMounth)
        
        const totalExpenseNotPay = await Expenses.findAll({
            attributes: [[sequelize.fn('sum',sequelize.col('value')),'Expenses']],
            where: {
                Type: 'Despesa',
                Date: {
                    [OP.gte]: thisMonth,
                    [OP.lt]: nextMounth,
                },
                Confirmed: false,
            },
            raw: true,
        })
        const totalExpensePay = await Expenses.findAll({
            attributes: [[sequelize.fn('sum',sequelize.col('value')),'Expenses']],
            where: {
                Type: 'Despesa',
                Date: {
                    [OP.gte]: thisMonth,
                    [OP.lt]: nextMounth,
                },
                Confirmed: true,
            },
            raw: true,
        });

        const totalRevenuePay = await Expenses.findAll({
            attributes: [[sequelize.fn('sum',sequelize.col('value')),'Revenues']],
            where: {
                Type: 'Receita',
                Date: {
                    [OP.gte]: thisMonth,
                    [OP.lt]: nextMounth,
                },
                Confirmed: true,
            },
            raw: true,
        });

        const totalRevenueNotPay = await Expenses.findAll({
            attributes: [[sequelize.fn('sum',sequelize.col('value')),'Revenues']],
            where: {
                Type: 'Receita',
                Date: {
                    [OP.gte]: thisMonth,
                    [OP.lt]: nextMounth,
                },
                Confirmed: false,
            },
            raw: true,
        });
        const latestExpensesAdded = await Expenses.findAll({
            where: {
                Type: 'Despesa'
            },
            limit: 3,
            order: [
                [
                    'id','desc'
                ]
            ]
        })
        const latestRevenuesAdded = await Expenses.findAll({
            where: {
                Type: 'Receita'
            },
            limit: 3,
            order: [
                [
                    'id','desc'
                ]
            ]
        })
        Expenses.belongsTo(Category, {foreignKey: 'id'})
        let categoriesExpensesSum = await Sequelize.query(
            'SELECT categories.name, Sum(value) as "Total" from expenses inner join categories on expenses.category_id = categories.id where expenses.Type = "Despesa" group by categories.name'
        )
        let categoriesRevenuesSum = await Sequelize.query(
            'SELECT categories.name, Sum(value) as "Total" from expenses inner join categories on expenses.category_id = categories.id where expenses.Type = "Receita" group by categories.name'
        )
        categoriesRevenuesSum = categoriesRevenuesSum[0];
        categoriesExpensesSum = categoriesExpensesSum[0];

        return res.json({totalExpenseNotPay,
            totalExpensePay,
            totalRevenuePay,
            totalRevenueNotPay,
            latestExpensesAdded,
            latestRevenuesAdded,
            categoriesExpensesSum,
            categoriesRevenuesSum,
        })
    },
    async addExpense(req,res) {
        // name
        // Date
        // Category
        // Repetition
        // RepetitionQTD
        // Type
        // Confirmed
        const {name, Date,value, Category, Repetition, RepetitionQTD, Type} = req.body;
        
        const date = '2019/' + Date;
        const expense = await Expenses.create({
            name,
            Date:date,
            category_id: Category,
            Repetition,
            RepetitionQTD,
            Type,
            value,
            Confirmed: false
        });
        
        return res.sendStatus(200);
    }
}