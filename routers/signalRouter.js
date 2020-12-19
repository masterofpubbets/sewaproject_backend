const express = require('express');
const router = express.Router();
const sql = require('mssql');
const auth = require('../middleware/auth');
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
    return res.status(200).send("You Are in Sql Server Mode signals");
});

router.post('/signaltop', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('top', sql.NVarChar(100), req.body.top)
        .execute('sp_signalTop')
        return res.status(200).send(result.recordsets)
    } catch(er) {
        return res.status(400).send(er);
    }
});

router.get('/summarymini', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_LoopSummaryMini')
        return res.status(200).send(result.recordsets)
    } catch(er) {
        return res.status(400).send(er);
    }
});
router.get('/summary', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_LoopSummary')
        return res.status(200).send(result.recordsets)
    } catch(er) {
        return res.status(400).send(er);
    }
});
router.get('/list', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_signalList')
        return res.status(200).send(result.recordsets)
    } catch(er) {
        return res.status(400).send(er);
    }
});
router.post('/details', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('tag', sql.NVarChar(100), req.body.tag)
        .execute('sp_signalDetails')
        return res.status(200).send(result.recordsets)
    } catch(er) {
        return res.status(400).send(er);
    }
});
router.post('/setdone', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('tag', sql.NVarChar(100), req.body.tag)
        .execute('sp_signalSetDone')
        return res.status(200).send('updated')
    } catch(er) {
        return res.status(400).send(er);
    }
});

module.exports = router;