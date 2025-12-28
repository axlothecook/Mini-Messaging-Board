var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

class UsersStorage {
    constructor() {
        this.storage = {};
        this.id = 0;
    }

    addUser({ username }) {
        const id = this.id;
        this.storage[id] = { 
            id: id,
            username,
            messagesArr: []
        };
        // console.log('all users:');
        // console.log(this.storage);
        localStorage.setItem('currentId', JSON.stringify({
            id, 
            username
        }));
        this.id++;
    }

    getMessages() {
        console.log(Object.values(this.storage));
        return Object.values(this.storage);
    }

    addMessage(id, { messageText, date }) {
        console.log('storage:');
        console.log(this.storage);
        this.storage[id].messagesArr.push({
            messageText: messageText,
            timeTexted: date
        });
    }
};

module.exports = new UsersStorage();