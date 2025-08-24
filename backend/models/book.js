'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.hasMany(models.BorrowRecord, {
        foreignKey: 'bookId',
      });
    }
  }
  Book.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    yearPublished: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    publisher: {
      type: DataTypes.STRING,
      defaultValue: '-'
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateAdded: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    source: {
      type: DataTypes.STRING,
      defaultValue: 'Unknown'
    },
    isOld: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    shelfCategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isBorrowed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'books', 
    timestamps: true
  });
  return Book;
};