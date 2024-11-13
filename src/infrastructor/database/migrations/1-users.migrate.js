'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },

      full_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      avatar: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      auth_provider: {
        allowNull: false,
        defaultValue: 'local',
        type: Sequelize.STRING
      },
      provider_id: {
        type: Sequelize.STRING
      },
      last_loin: {
        type: Sequelize.DOUBLE
      },
      is_online: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      last_seen: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      role: {
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
    await queryInterface.dropTable('Users');
  }
};