const Expenses = require('../../models/Expenses');
const Category = require('../../models/Category');
const sequelize = require('sequelize');
const OP = sequelize.Op;


module.exports = {
    
    async index(req,res) {
        const thisMonth =  '2019/' + (new Date().getMonth() + 1).toString()  + '/01' + ' 03:00:00' ;
        const nextMounth = '2019/' + (new Date().getMonth() + 2).toString()  + '/01' + ' 03:00:00' ;
        
        Expenses.belongsTo(Expenses, {foreignKey: 'id'});
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

        res.json({totalExpenseNotPay,totalExpensePay,totalRevenuePay,totalRevenueNotPay})
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
        if(Repetition !== 'Mensal' && Repetition !== 'Anual' && Repetition !== 'Diaria') 
        {
            return res.sendStatus(400);
        }
        const date = '2019/' + Date;
        const expense = await Expenses.create({
            name,
            Date:date,
            Category,
            Repetition,
            RepetitionQTD,
            Type,
            value,
            Confirmed: false
        });
        
        return res.sendStatus(200);
    }
}