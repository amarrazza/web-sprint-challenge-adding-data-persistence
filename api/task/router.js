const router = require('express').Router();
const Tasks = require('./model');

router.get('/', (req, res, next) => {
    Tasks.findTasks()
        .then(tasks => {
            res.json(tasks);
        })
        .catch(next)
});

router.post('/', (req, res, next) => {
    const newTask = req.body;

    Tasks.addTask(newTask)
        .then(task => {
            res.status(201).json(task)
        })
        .catch(next)
});

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: 'Something has gone wrong',
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router;