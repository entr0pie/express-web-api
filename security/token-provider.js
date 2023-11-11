const jose = require('jose');

const secret = process.env.SECRET_KEY;
const algorithm = 'HS256';
const privateKey = new TextEncoder().encode(secret);

async function createToken(email) {
    return await new jose.SignJWT()
        .setProtectedHeader({alg: algorithm})
        .setIssuedAt()
        .setExpirationTime('2h')
        .setSubject(email).sign(privateKey);
}

async function verifyToken(rawToken) {
    const {payload, protectedHeaders} = await jose.jwtVerify(rawToken, privateKey);
    return payload.sub;
}

module.exports = {createToken, verifyToken};
