'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShareMessage', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },

      message_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      message_share_id: {
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
    await queryInterface.dropTable('ShareMessage');
  }
};