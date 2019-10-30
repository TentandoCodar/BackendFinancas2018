'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Expenses', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
      },
      name: {         
        allowNull: false,
        type: Sequelize.STRING,
      },
      Date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      Category: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      Repetition: {
        type: Sequelize.STRING,


      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      RepetitionQTD: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Confirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },

      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
