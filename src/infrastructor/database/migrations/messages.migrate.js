'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },

      conversation_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sender_id: {
        type: Sequelize.STRING
      },
      message_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING
      }, // sent, recieved, seen
      is_pined: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Messages');
  }
};