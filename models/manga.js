'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Manga.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    avatarUrl: DataTypes.STRING,
    genre: DataTypes.TEXT,
    author: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Manga',
  });
  return Manga;
};