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

router.get("/", async (req, res) => {
    return res.status(200).send("You Are in Sql Server Mode equipment");
});

router.post('/equipmenttop', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('top', sql.NVarChar(100), req.body.top)
        .execute('sp_equipmentTop')
        return res.status(200).send(result.recordsets)
    } catch(er) {
        return res.status(400).send(er);
    }
});

router.get('/summary', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_eqSummaryByUnit')
        return res.status(200).send(result.recordsets)
    } catch(er) {
        return res.status(400).send(er);
    }
});

router.post('/detail', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('tag', sql.NVarChar(100), req.body.tag)
        .execute('sp_getEqDetail')
        return res.status(200).send(result.recordsets)
    } catch(er) {
        return res.status(400).send(er);
    }
});

router.get('/list', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_getEqMini')
        return res.status(200).send(result.recordsets)
    } catch(er) {
        return res.status(400).send(er);
    }
});

router.post('/seterected', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('eq', sql.NVarChar(100), req.body.tag)
        .execute('sp_EQ_setErectedName')
        return res.status(200).send('updated')
    } catch(er) {
        return res.status(400).send(er);
    }
});

module.exports = router;