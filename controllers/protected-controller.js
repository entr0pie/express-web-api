const express = require('express');
const protectedRouter = express.Router();
const authorizationFilter = require('../security/authorization-filter');

function protectedRoute(req, res) {
    return res.json({"message": "This is a protected route"});
}

protectedRouter.get("/", authorizationFilter, protectedRoute);

module.exports = protectedRouter;