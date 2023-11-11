const {verifyToken} = require('./token-provider');


async function authorizationFilter(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({'error': 'Authorization header missing'});
    }

    const token = authHeader.split(' ')[1];
    try {
        await verifyToken(token);
        next();
    } catch (err) {
        return res.status(401).json({'error': 'Invalid token'});
    }
}

module.exports = authorizationFilter;
