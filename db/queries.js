const pool = require('./pool');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

async function getAllMessages() {
    //const smt = 
    const { rows } = await pool.query('SELECT * FROM users');
    // const { rows } =
    // console.log('smt:');
    // console.log(rows);
    return rows;
    // return smt;
};

async function registerUser(username) {
    const { rows } = await pool.query(`INSERT INTO users (username) VALUES ($1) RETURNING user_id`, [username]);
    localStorage.setItem('currentId', JSON.stringify({
        id: rows[0].user_id, 
        username
    }));
};

async function insertMessage({ messageText, date }, userId) {
    let object = `{{${messageText}, ${date}}}`;
    console.log('object:');
    console.log(object);
    await pool.query("UPDATE users SET messages = ARRAY_CAT(($1), messages) WHERE user_id = ($2)", [object, userId]);
};

module.exports = {
    getAllMessages,
    registerUser,
    insertMessage
};