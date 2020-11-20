const bcrypt = require('bcrypt');

async function hash(word) {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(word,salt);
};

async function validate(pass1,pass2) {
    const validatePass = await bcrypt.compare(pass1,pass2);
    if (!validatePass) {
        return false;
    } else {
        return true;
    }
};


module.exports = {
    hash: hash,
    validate: validate
};