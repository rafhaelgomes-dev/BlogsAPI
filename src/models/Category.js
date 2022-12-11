'use strict';

const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    name: DataTypes.STRING,
  }, {
    underscored: true,
    tableName: 'categories',
    timestamps: false,
  });
  
  return Category;
};

module.exports = Category;