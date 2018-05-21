const sequelize = require('../sequelize.js');
const Sequelize = require('sequelize');

// define sequelize user table
const Member = sequelize.define('MEMBER', {
  mem_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  mem_type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mem_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mem_email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true, // email check
    },
  },
  mem_password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mem_phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^\d{3}-\d{4}-\d{4}$/i,
    },
  },
  mem_gender: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  mem_birthday: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: null
  },
  mem_greeting: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  mem_academic_file: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  mem_career_file: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  mem_completion_file: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  },
  mem_instructor_verified: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: true
  },
  mem_instructor_active: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: true
  },
  mem_profile: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  mem_terms: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  mem_privacy: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  mem_email_agree: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  mem_phone_agree: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  mem_createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  mem_lastLoginedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  mem_lastUpdatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  mem_passwordChangedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = Member;
