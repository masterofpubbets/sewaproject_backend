const sql = require("mssql");
const sqlURL = process.env.TOP_SQLURL;
const sqlUser = process.env.TOP_SQLUSER;
const sqlPass = process.env.TOP_SQLPASS;
const sqlDb = process.env.TOP_DB;

const config = {
    user: sqlUser,
    password: sqlPass,
    server: sqlURL,
    database: sqlDb,
    options: {
        "encrypt": true,
        "enableArithAbort": true
      }
};

async function saveUserLogin(user) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('userName', sql.NVarChar(50), user.userName)
        .input('fullName', sql.NVarChar(100), user.fullName)
        .input('computerUserName', sql.NVarChar(100), user.computerUserName)
        .input('loginAs', sql.NVarChar(50), user.loginAs)
        .execute('sp_addLogginLog')
        return true
    } catch(ex) {
        return false
    }
};

module.exports = {
    saveUserLogin: saveUserLogin
};