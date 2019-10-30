const sequelize = require('sequelize');

const Sequelize = new sequelize('CMS','root','', {
    host: '127.0.0.1',
    dialect: 'mysql',
});

const Category = Sequelize.define('Categories', {
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
})

module.exports = Category;