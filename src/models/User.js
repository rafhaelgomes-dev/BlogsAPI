'use strict';

const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    underscored: true,
    tableName: 'users',
    timestamps: false,
  });

  User.hasMany(models.Category, { foreignKey: 'user_id', as: 'blogPosts' })

  return User;
};

module.exports = User;