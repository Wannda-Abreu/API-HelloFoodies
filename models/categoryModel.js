import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const CategoryModel = db.define('categories', {
  title: { type: DataTypes.JSON, allowNull: false },
}, {
  timestamps: false,
});

export default CategoryModel;

