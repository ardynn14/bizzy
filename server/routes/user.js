const router = require('express').Router();
const userController = require('../controllers');

router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.post('/', userController.create);
router.patch('/:id', userController.edit);
router.delete('/:id', userController.delete);


module.exports = router; 