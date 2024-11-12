'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NotifyMessage', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },

      message_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      notify_type: {
        allowNull: false,
        type: Sequelize.STRING
      },  // new_partcipant, leave, timeline, ...
      content: {
        type: Sequelize.TEXT
      },
      user_id: {
        type: Sequelize.STRING
      },
      timeline: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('NotifyMessage');
  }
};