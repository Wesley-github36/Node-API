'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChapterImagesUrl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChapterImagesUrl.init({
    url: DataTypes.STRING,
    order: DataTypes.INTEGER,
    mangaId: DataTypes.INTEGER,
    chapter: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChapterImagesUrl',
  });
  return ChapterImagesUrl;
};