const express = require('express');
const db = require('./db/index');
const { Student, School } = db.models;
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});

db.syncAndSeed().then(() => {console.log('DB is synced and seeded')});


app.use(require('body-parser').json());
app.use('/api', require('./api'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

app.use((err, req, res, next) => {
    console.error(err, typeof next)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })

// app.get('/api/students', (req, res, next) => {
//     Student.findAll()
//         .then(students => res.json(students))
//         .catch(next);
// })

// app.get('/api/students/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);
//     Student.findById(id)
//         .then(student => res.json(student))
//         .catch(next);
// })

// app.post('/api/students/', (req, res, next) => {
//     Student.create(req.body)
//         .then(student => res.json(student))
//         .catch(next);
// })

// app.put('/api/students/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);
//     Student.findById(id)
//       .then(student => student.update(req.body))
//       .then(student => res.json(student))
//       .catch(next)
// })

// app.delete('/api/students/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);
//     Student.findById(id)
//         .then(student => student.destroy())
//         .then(() => res.sendStatus(204))
//         .catch(next);
// })  

// app.get('/api/schools', (req, res, next) => {
//     School.findAll()
//         .then(schools => res.json(schools))
//         .catch(next);
// })

// app.get('/api/schools/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);
//     School.findById(id)
//         .then(school => res.json(school))
//         .catch(next)
// })

// app.post('/api/schools/', (req, res, next) => {
//     School.create(req.body)
//         .then(school => res.json(school))
//         .catch(next);
// })

// app.delete('/api/schools/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);  
//     Student.findAll({
//         where: {
//             shcoolId: id
//         }
//     }).then((students) => {
//         for(student in students){
//             student.shcoolId = null
//         }
//         return students;
//     }).then(() => res.sendStatus(204))
//     School.findById(id)
//     .then(school => school.destroy())
//     .catch(next);
// })

// app.put('/api/schools/:id', (req, res, next) => {
//     const id = parseInt(req.params.id);
//     School.findById(id)
//       .then(school => school.update(req.body))
//       .then(school => res.json(school))
//       .catch(next)
// })