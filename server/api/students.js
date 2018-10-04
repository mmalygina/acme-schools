const router = require('express').Router();
const db = require('./../db/index');
const {Student} = db.models;

router.get('/', (req, res, next) => {
    Student.findAll()
        .then(students => res.json(students))
        .catch(next);
})

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    Student.findById(id)
        .then(student => res.json(student))
        .catch(next);
})

router.post('/', (req, res, next) => {
    Student.create(req.body)
        .then(student => res.json(student))
        .catch(next);
})

router.put('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    Student.findById(id)
      .then(student => student.update(req.body))
      .then(student => res.json(student))
      .catch(next)
})

router.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    Student.findById(id)
        .then(student => student.destroy())
        .then(() => res.sendStatus(204))
        .catch(next);
})

module.exports = router