const jwt = require('jsonwebtoken');
const privateKey = process.env.TOP_PRIVATEKEY;

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).send('Access Denied. No Token');
    } else {
        try {
            const decode = jwt.verify(token, privateKey);
            req.user = decode;
            next();
        } catch(ex) {
            res.status(401).send('Bad Token');
        }
    }
};

module.exports = auth;