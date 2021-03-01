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

async function updateCablePulling (cable) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('tag', sql.NVarChar(100), cable.tag)
        .input('actualLength', sql.FLOAT, cable.actualLength)
        .input('userName', sql.NVarChar(100), cable.userName)
        .execute('sp_addTempCableProductionPulling')
        return true
    } catch(er) {
        return false
    }
};
async function updateCableConFrom (cable) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('tag', sql.NVarChar(100), cable.tag)
        .input('userName', sql.NVarChar(100), cable.userName)
        .execute('sp_addTempCableProductionConFrom')
        return true
    } catch(er) {
        return false
    }
};
async function updateCableConTo (cable) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('tag', sql.NVarChar(100), cable.tag)
        .input('userName', sql.NVarChar(100), cable.userName)
        .execute('sp_addTempCableProductionConTo')
        return true
    } catch(er) {
        return false
    }
};
async function updateCableTest (cable) {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('tag', sql.NVarChar(100), cable.tag)
        .input('userName', sql.NVarChar(100), cable.userName)
        .execute('sp_addTempCableProductionTest')
        return true
    } catch(er) {
        return false
    }
};

module.exports = {
    updateCablePulling: updateCablePulling,
    updateCableConFrom: updateCableConFrom,
    updateCableConTo: updateCableConTo,
    updateCableTest: updateCableTest

};