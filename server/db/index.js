const conn = require('./connection');
const Student = require('./models/Student');
const School = require('./models/School');

const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then(()=> {
      return Promise.all([
        School.create({ name: 'School A', address: 'Address 1', description: '!!A' }),
        School.create({ name: 'School B', address: 'Address 2', description: '!!B' }),
        School.create({ name: 'School C', address: 'Address 3', description: '!!C' }),
      ]).then(([schoolA, schoolB, schoolC]) => {
          return Promise.all([
              Student.create({firstName: 'Moe', lastName: 'Smith', gpa: 3.75}),
              Student.create({firstName: 'Joe', lastName: 'Green'}),
              Student.create({firstName: 'Abby', lastName: 'White', gpa: 2.5}),
              Student.create({firstName: 'Jessica', lastName: 'Black'})
          ]).then(([moe, joe, abby, jessica]) => {
            moe.schoolId = schoolA.id; 
            joe.schoolId = schoolA.id; 
            abby.schoolId = schoolB.id; 
            jessica.schoolId = schoolC.id; 
            return Promise.all([ moe.save(), joe.save(), abby.save(), jessica.save()]);
          })
      })
    });
};

module.exports = {
  models: {
    Student,
    School
  },
  syncAndSeed
};