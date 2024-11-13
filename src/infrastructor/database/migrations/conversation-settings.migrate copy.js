'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ConversationSettings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },

      conversation_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Conversations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      setting_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      setting_value: {
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
    await queryInterface.dropTable('ConversationSettings');
  }
};