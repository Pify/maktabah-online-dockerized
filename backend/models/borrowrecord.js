'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BorrowRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BorrowRecord.belongsTo(models.Book, {
        foreignKey: 'bookId',
      });
    }
  }
  BorrowRecord.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true
    },
    bookId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    borrowerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    borrowerAge: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 8,
        max: 70
      }
    },
    borrowedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estimatedReturnAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    returnedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('Dipinjam', 'Dikembalikan'),
      defaultValue: 'Dipinjam',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'BorrowRecord',
    tableName: 'borrow_records',
  });
  return BorrowRecord;
};