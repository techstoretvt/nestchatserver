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
        type: Sequelize.STRING,
        references: {
          model: 'Conversations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      is_pinned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      pinned_at: {
        type: Sequelize.DOUBLE
      },
      is_hidden: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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