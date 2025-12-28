const { Router } = require('express');
const indexRouter = Router();
const usersController = require('../controllers/usersController');
// import usersController from '../controllers/baba';

// let currentUser = localStorage.getItem('currentId') || '';
// indexRouter.get('/id', (req, res) => {
//   res.send(currentid++)
//   res.redirect('/')
// });
// let currentUser = '';

indexRouter.get('/', usersController.usersMessagesGet);
indexRouter.post('/newUser', usersController.createUserPost);
indexRouter.post('/:id/newMessage', usersController.createMessagePost);

module.exports = indexRouter;