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
        type: Sequelize.STRING,
        references: {
          model: 'Messages',
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
      icon_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      icon_count: {
        type: Sequelize.INTEGER,
        defaultValue: 1
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