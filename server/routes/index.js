const router = require('express').Router();
const user = require('./user');

router.get('/', (req, res) => {
    res.status(200).json({
        "message": 'ok'
    });
});

router.use('/users', user);

module.exports = router; 