
const express = require('express');
const userRouter = express.Router();
const {createToken} = require('../security/token-provider');
const {findUserByEmail} = require('../repositories/user-repository');

async function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).json({"error": "email and password are required"});
    }

    const user = findUserByEmail(email);

    if (user == null || user.password !== password) {
        return res.status(401).json({"error": "invalid credentials"});
    }

    const token = await createToken(email);
    return res.json({"token": token});
}

async function register(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).json({"error": "email and password are required"});
    }

    const user = await findUserByEmail(email);
    if (user) {
        return res.status(400).json({"error": "email already exists"});
    }

    user = await addUser(email, password);
    const token = createToken(email);
    return res.json({"token": token});
}

userRouter.post("/login", login);
userRouter.post("/register", register);

module.exports = userRouter;