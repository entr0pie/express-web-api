#!/bin/node

const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const app = express();
app.use(express.json());

const userRouter = require('./controllers/user-controller');
app.use('/api/users', userRouter);

const protectedRouter = require('./controllers/protected-controller');
app.use('/api/protected', protectedRouter);

app.listen(8000, () => {console.log("Running at http://localhost:8000")})
