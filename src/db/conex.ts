import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const config = {
  user    : `${process.env.USER_DB}`,
  password: `${process.env.PASS_DB}`,
  server  : `${process.env.HOST_DB}`,
  database: `${process.env.NAME_BD}`
}

const db = new Sequelize(config.database, config.user, config.password, {
  host: config.server,
  dialect: 'postgres',
  //logging: false
});

export default db;
