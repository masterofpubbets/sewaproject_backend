const mongo = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const mongoURL = process.env.TOP_MONGOURL;
const mongoUser = process.env.TOP_MONGOUSER;
const mongoPass = process.env.TOP_MONGOPASS;
const mongoDB = process.env.TOP_MONGODB;
const connSTR = `mongodb://${mongoUser}:${mongoPass}@${mongoURL}:27017/${mongoDB}?authSource=admin&readPreference=primary&ssl=false`;
let isConnected = false;
const users = require('../users/userSchema');
const mongoConProm = mongo.connect(connSTR, { useUnifiedTopology: true, useNewUrlParser: true });

isConnected = mongoConProm.then(() => {
    console.log('mongo db connected');
    this.isConnected = true;
    return (true);
}).catch((reject) => {
    console.log('mongo db connection error ' + reject);
    return false;
});


router.post('/', auth, async (req,res) => {
    if (!isConnected) {
        res.status(401).send('Server is offline');
    } else {
        const result = users.userValidate.validate(req.body);
        if (result.error) {
            return(res.status(406).send(result.error.message));
        } else {
            const result = await users.isUserExists(req.body);
            if (result === false) {
                users.addUser(req.body)
                .then(u => {
                    res.status(200).send(u);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
            } else {
                res.status(403).send('This User is exist');
            }
        }
    }
});

router.get('/',auth, async (req,res) => {
    if (!this.isConnected) {
        return(res.status(404).send('server is offline'));
    };
    const result = await users.getUsers();
    res.status(200).send(result);
});

router.post('/login', async (req,res) => {
    if (!this.isConnected) {
        return(res.status(404).send('server is offline'));
    };
    const validate = await users.userLogin(req.body);
    if (!validate) {
        res.status(400).send('wrong user name or password');
    } else {
        const result = {...validate._doc, token: validate.token}
        res.header('x-auth-token',validate.token).status(200).send(result);
    };
});

router.delete('/', auth, async (req,res) => {
    if (!this.isConnected) {
        return(res.status(404).send('server is offline'));
    };
    const userID = req.body.userID;
    try {
        const result = await users.deleteUser(userID)
        res.status(200).send(result)
    } catch(err) {
        res.status(400).send(err)
    }

});


module.exports = router;