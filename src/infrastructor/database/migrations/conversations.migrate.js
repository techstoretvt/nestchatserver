'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Conversations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },

      group_name: {
        type: Sequelize.STRING
      },
      is_group: {
        type: Sequelize.BOOLEAN
      },
      last_message_at: {
        type: Sequelize.DOUBLE
      },
      background_image: {
        type: Sequelize.TEXT
      },
      status: {
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
    await queryInterface.dropTable('Conversations');
  }
};