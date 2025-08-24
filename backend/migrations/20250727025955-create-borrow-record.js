'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('borrow_records', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      bookId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'books',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      borrowerName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      borrowerAge: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      borrowedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      estimatedReturnAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      returnedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('Dipinjam', 'Dikembalikan'),
        defaultValue: 'Dipinjam'
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
    await queryInterface.dropTable('borrow_records');
  }
};