const jwt = require('jsonwebtoken');

function setToken(payload, sign, options) {
    return jwt.sign(payload, sign, options);
}

function getToken(token, sign) {
    return jwt.verify(token, sign);
}

module.exports = {
    setToken,
    getToken
}