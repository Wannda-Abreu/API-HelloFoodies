import { Sequelize } from 'sequelize';

const db = new Sequelize({
  dialect: 'mysql', 
  host: 'localhost', 
  username: 'root', 
  password: 'introduce-your-password-here',
  database: 'hellofoodies', 
});

export default db;

