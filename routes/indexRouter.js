const { Router } = require('express');
const indexRouter = Router();
const usersController = require('../controllers/usersController');

indexRouter.get('/', usersController.usersMessagesGet);
indexRouter.post('/newUser', usersController.createUserPost);
indexRouter.post('/:id/newMessage', usersController.createMessagePost);

module.exports = indexRouter;