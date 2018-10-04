const router = require('express').Router();
const db = require('./../db/index');
const {School} = db.models;

router.get('/', (req, res, next) => {
    School.findAll()
        .then(schools => res.json(schools))
        .catch(next);
})

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    School.findById(id)
        .then(school => res.json(school))
        .catch(next)
})

router.post('/', (req, res, next) => {
    School.create(req.body)
        .then(school => res.json(school))
        .catch(next);
})

router.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
     School.findById(id)
         .then(school => school.destroy())  
    Student.findAll({
        where: {
            shcoolId: id
        }
    }).then((students) => {
        for(student in students){
            student.shcoolId = null
        }
        return students;
    }).then(() => res.sendStatus(204))
    .catch(next);
})

router.put('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    School.findById(id)
      .then(school => school.update(req.body))
      .then(school => res.json(school))
      .catch(next)
})

module.exports = router