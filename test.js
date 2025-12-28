let messagesArr = [
    {
        user_id: 1,
        username: 'Bob',
        messages: [
            [ 'one', 'Dec 28', '11:06 PM' ], 
            [ 'two', 'Dec 28', '11:13 PM' ],
            [ 'trhid', 'Dec 28', '11:19 PM' ], 
            [ 'last', 'Dec 28', '11:21 PM' ]
        ]
    }
];

let userId = 0;

for (let user = (messagesArr.length - 1); user >= 0; user--) { 
    for (let msg = 0; msg < messagesArr[user].messages.length; msg++) {
        console.log( 
            { 
                data: { 
                    user_id: messagesArr[user].user_id, 
                    username: messagesArr[user].username, 
                    text: messagesArr[user].messages[msg][0], 
                    addedPt1: messagesArr[user].messages[msg][1], 
                    addedPt2: messagesArr[user].messages[msg][2] 
                }, 
                    
                id: userId
            }
        )
    };
    userId++;
};