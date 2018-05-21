const db = require('../config/database.json');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(db.name, db.user, db.password, {
  host: db.host,
  dialect: 'mysql',
  pool: {
    max: 20,
    min: 0,
    idle: 1000,
  },
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
  },
  port: db.port,
});

module.exports = sequelize;
