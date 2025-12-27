const { Router } = require('express');
const indexRouter = Router();
const { _ } = require('lodash');
let {
  warning,
  messages,
  counter,
  reformatDate
} = require('../data');

// let currentUser = localStorage.getItem('currentId') || '';
let currentUser = '';
// let currentid = 0;

indexRouter.get('/', (req, res) => {
  res.render('index', {
    title: 'Mini Messaging Board',
    messages,
    currentUser,
    warning
  });
});

// indexRouter.get('/id', (req, res) => {
//   res.send(currentid++)
//   res.redirect('/')
// });

indexRouter.post('/', (req, res) => {
  if (_.isEmpty(req.body)) {
    warning = {
      message: `You're already logged in`,
      warning: true,
      repeatedLogInError: true,
      notSignedInError: false
    };
    res.redirect("/");
  } else {
    if (req.body.userName && currentUser.length === 0) {
      currentUser = req.body.userName;
      warning = {
        message: null,
        warning: false,
        repeatedLogInError: false,
        notSignedInError: false
      };
    } else if (currentUser.length !== 0) {
      messages.push({ 
        text: req.body.userMsg, 
        user: currentUser, 
        added: reformatDate(new Date()) 
      });
      warning = {
        message: null,
        warning: false,
        repeatedLogInError: false,
        notSignedInError: false
      };
    } else if (req.body.userMsg && currentUser.length === 0) {
      warning = {
        message: 'Enter your username first!',
        warning: true,
        repeatedLogInError: false,
        notSignedInError: true
      };
    };
    res.redirect("/");
  };
});


module.exports = indexRouter;