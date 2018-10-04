const conn = require('./../connection');
const Student = require('./Student');

const School = conn.define('school', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: conn.Sequelize.STRING,
  }
});

School.hasMany(Student);
Student.belongsTo(School);

module.exports = School;