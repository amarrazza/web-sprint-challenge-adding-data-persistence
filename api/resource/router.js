const router = require('express').Router();
const Resources = require('./model');

router.get('/', (req, res, next) => {
    Resources.findResources()
        .then(resources => {
            res.json(resources);
        })
        .catch(next)
});

router.post('/', (req, res, next) => {
    const newResource = req.body;

    Resources.addResource(newResource)
        .then(resource => {
            res.status(201).json(resource)
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