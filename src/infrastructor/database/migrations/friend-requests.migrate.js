'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FriendRequests', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },

      from_user_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      to_user_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      request_message: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },  // pending, accepted, canceled
      response_time: {
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
    await queryInterface.dropTable('FriendRequests');
  }
};