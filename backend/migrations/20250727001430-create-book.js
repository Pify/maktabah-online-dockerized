'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      yearPublished: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      publisher: {
        type: Sequelize.STRING,
        defaultValue: '-'
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dateAdded: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      source: {
        type: Sequelize.STRING,
        defaultValue: 'Unknown'
      },
      isOld: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      shelfCategory: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isBorrowed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('books');
  }
};
