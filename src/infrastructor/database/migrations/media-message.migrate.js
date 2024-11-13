'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('MediaMessage', {
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
            media_type: {
                allowNull: false,
                type: Sequelize.STRING
            }, // image, video, audio
            media_url: {
                allowNull: false,
                type: Sequelize.TEXT
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
        await queryInterface.dropTable('MediaMessage');
    }
};