const sequelize = require('sequelize');

const Sequelize = new sequelize('CMS','root','', {
    host: '127.0.0.1',
    dialect: 'mysql',
});

const Expense = Sequelize.define('Expenses', {
    id: {
        allowNull: false,
        type: sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
      },
    name: {         
        allowNull: false,
        type: sequelize.STRING,
    },
    Date: {
        allowNull: false,
        type: sequelize.DATE,
    },
    category_id: {
        allowNull: false,
        type: sequelize.INTEGER,
        references: {
            model: 'Categories',
            key: 'id'
        }
    },
    Repetition: {
        type: sequelize.STRING,


    },
    value: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    RepetitionQTD: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    Type: {
        type: sequelize.STRING,
        allowNull: false,
    },
    Confirmed: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        default: false,
    },
})

module.exports = Expense;