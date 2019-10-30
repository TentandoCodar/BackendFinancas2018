const sequelize = require('sequelize');

const Sequelize = new sequelize('CMS','root','', {
    host: '127.0.0.1',
    dialect: 'mysql',
});

const User = Sequelize.define('Users', {
    id: {
        allowNull: false,
        type: sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    email: {
        allowNull: false,
        type: sequelize.STRING,
    },
    password: {
        allowNull: false,
        type: sequelize.STRING,
    },
    token: {
        allowNull: true,
        type: sequelize.STRING,
    },
    createdAt: {
        type: sequelize.DATE,
    },
    updatedAt: {
        type: sequelize.DATE,
    },
})

module.exports = User;