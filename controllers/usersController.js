const db = require('../db/queries');
const { format } = require('date-fns');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
const {
    body,
    validationResult,
    matchedData
} = require('express-validator');

const reformatDate = (date) => {
  return format(date, 'MMM dd, hh:mm a');
};

const alphaUserErr = 'can only contain letters, numbers and space.';
const alphaMsgErr = 'can only contain letters, numbers, commas, full stop and space.';
const lengthUsernameErr = 'must be between 2 and 10 characters.';
const lengthMessageErr = 'can only be up to 100 characters.';

const validateUser = [
    body('username').trim()
    .isLength({ min: 2, max: 10 }).withMessage(`Username ${lengthUsernameErr}`)
    .matches(/^[A-Za-z0-9 ]+$/).withMessage(`Username ${alphaUserErr}`)
];

const validateMessage = [
    body('messageText').trim()
    .optional({ values: "falsy" })
    .isLength({ min: 0, max: 100 }).withMessage(`Message ${lengthMessageErr}`)
    .matches(/^[A-Za-z0-9,.!><@ ]+$/).withMessage(`Message ${alphaMsgErr}`)
];

let warning = null;
let currentUser = null;

const usersMessagesGet = async (req, res) => {
    const messagesArr = await db.getAllMessages();
    if(!currentUser) currentUser = JSON.parse(localStorage.getItem('currentUserId')) || null;
    res.render('index', {
        messagesArr: messagesArr ? messagesArr : null,
        username: currentUser ? currentUser.username : null,
        userId: currentUser ? currentUser.id : 0,
        createNewUserAlarm: currentUser ? false : 'true',
        errors: [],
        warning: warning
    });
};

const createUserPost = [
    validateUser,
    async (req, res) => {
        if (req.body.username.length === 0 && currentUser !== null) {
            warning = {
                message: `You're already logged in`,
                welcomeEmoji: false,
                infoWarning: true,
                dangerouWarning: false
            };
            return res.redirect('/');
        } else {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).render('index', {
                    username: null,
                    createNewUserAlarm: false,
                    errors: errors.array(),
                    warning: null
                });
            };
            const { username } = matchedData(req);
            await db.registerUser(username);
            warning = {
                message: `Welcome to the chat ${username}!`,
                welcomeEmoji: true,
                infoWarning: false,
                dangerouWarning: false
            };
            res.redirect('/');
        };
    }
];
 
const createMessagePost = [
    validateMessage,
    async (req, res) => {
        if (req.body.messageText.length === 0 && currentUser !== null) {
            return res.redirect('/');
        } else if (req.body.messageText.length >= 0 && !currentUser) {
            warning = {
                message: 'Enter your username first!',
                welcomeEmoji: false,
                infoWarning: false,
                dangerousWarning: true
            };
            return res.redirect('/');
        } else {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                warning = {
                    message: errors.array()[0].msg,
                    welcomeEmoji: false,
                    infoWarning: false,
                    dangerousWarning: true
                };
                return res.redirect('/');
            }; 

            const { messageText } = matchedData(req);
            await db.insertMessage({ messageText, date: reformatDate(new Date()) }, req.params.id);
            warning = null;
            res.redirect('/');
        };
    }
];

module.exports = {
    usersMessagesGet,
    createUserPost,
    createMessagePost
};