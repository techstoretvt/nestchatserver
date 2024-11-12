'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Participants', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },

      conversation_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      joined_at: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING
      },
      can_send_message: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      is_pinned: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      pinned_at: {
        type: Sequelize.DOUBLE
      },
      is_hidden: {
        allowNull: false,
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
    await queryInterface.dropTable('Participants');
  }
};