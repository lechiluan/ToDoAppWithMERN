const { Router } = require('express');
const ToDoController = require('../controllers/ToDoController');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/show', authMiddleware.authenticate, ToDoController.getToDo);
router.post('/save', authMiddleware.authenticate, ToDoController.saveToDo);
router.put('/update', authMiddleware.authenticate, ToDoController.updateToDo);
router.delete('/delete', authMiddleware.authenticate, ToDoController.deleteToDo);

module.exports = router;
