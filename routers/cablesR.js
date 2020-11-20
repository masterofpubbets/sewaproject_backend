const express = require("express");
const router = express.Router();
const sql = require("mssql");
const auth = require("../middleware/auth");
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

router.get('/', (req, res) => {
    res.status(200).send('You Are in Sql Server Mode cables')
});

router.post("/cablestop", auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('top', sql.NVarChar(100), req.body.top)
        .execute('sp_cablesTop')
        return res.status(200).send(result.recordsets)
    } catch (er) {
        return res.status(400).send(er);
    }
});


module.exports = router;
