const conn = require('./../connection');

const Student = conn.define('student', {
  firstName: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: true,
      is: ["^[a-z]+$",'i']
    }
  },
  lastName: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: true,
      is: ["^[a-z]+$",'i']
    }
  },
  gpa: {
    type: conn.Sequelize.DECIMAL(10, 2),
    allowNull: true,
    validate: {
        min: 0,
        max: 4,
        isDecimal: true
    }
  }
});

module.exports = Student;