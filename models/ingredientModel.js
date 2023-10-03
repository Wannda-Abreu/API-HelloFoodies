import db from '../database/db.js';
import { DataTypes } from 'sequelize';


const IngredientModel = db.define('ingredients', {
  title: { type: DataTypes.JSON, allowNull: false },
}, {
  timestamps: false,
});

export default IngredientModel;