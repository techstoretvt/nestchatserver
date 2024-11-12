'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BlockedUsers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },

      user_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      friend_id: {
        allowNull: false,
        type: Sequelize.STRING
      },


      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BlockedUsers');
  }
};