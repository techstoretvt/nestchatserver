'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MessageReactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },

      message_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      icon_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      icon_count: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('MessageReactions');
  }
};