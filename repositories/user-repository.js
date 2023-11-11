
const fakeDatabase = [
    {
        email: 'email@email.com',
        password: '12345'
    },
    {
        email: 'email2@email.com',
        password: '12345'
    },
];

function findUserByEmail(email) {
    return fakeDatabase.find(user => user.email === email);
}

function addUser(email, password) {
    fakeDatabase.push({email, password});
    return {email, password};
}

module.exports = {findUserByEmail, addUser};