const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const logs = require('../logs/logs');

router.get('/', (req, res) => {
    return(res.status(200).send(' YOU ARE IN LOGS ROOT'))
});

router.post('/userlogin', auth, async (req, res) => {
    try {
        const result = await logs.saveUserLogin(req)
        if (result === true) {
            return(res.status(200).send('looged'))
        } else {
            return(res.status(400).send('not looged'))
        }
    } catch(er) {
        return(res.status(401).send(er));
    }
});

module.exports = router;