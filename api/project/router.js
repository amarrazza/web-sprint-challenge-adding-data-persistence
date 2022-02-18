const router = require('express').Router();
const Projects = require('./model');

router.get('/', (req, res, next) => {
    Projects.findProjects()
        .then(projects => {
            res.json(projects);
        })
        .catch(next)
});

router.post('/', (req, res, next) => {
    const newProject = req.body;

    Projects.addProject(newProject)
        .then(project => {
            res.status(201).json(project)
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