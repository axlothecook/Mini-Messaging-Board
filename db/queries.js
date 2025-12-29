const pool = require('./pool');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

async function getAllMessages() {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
};

async function registerUser(username) {
    const { rows } = await pool.query(`INSERT INTO users (username) VALUES ($1) RETURNING user_id`, [username]);
    localStorage.setItem('currentUserId', JSON.stringify({
        id: rows[0].user_id, 
        username
    }));
};

async function insertMessage({ messageText, date }, userId) {
    let object = `{{{"${messageText}"}, {"${date}"}}}`;
    await pool.query("UPDATE users SET messages = ARRAY_CAT(($1), messages) WHERE user_id = ($2)", [object, userId]);
};

module.exports = {
    getAllMessages,
    registerUser,
    insertMessage
};