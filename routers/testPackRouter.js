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

router.get('/', (req, res) => {
    res.status(200).send('You Are in Sql Server Mode cables')
});

router.post('/testpacktop', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('top', sql.NVarChar(100), req.body.top)
        .execute('sp_testPackTop')
        return res.status(200).send(result.recordsets)
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.get('/testpack', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_getTestPack')
        return res.status(200).send(result.recordsets)
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.post('/testpack/details', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('tp', sql.NVarChar(100), req.body.tp)
        .execute('sp_getTestPackDetails')
        return res.status(200).send(result.recordsets)
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.post('/testpack/setrinst', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('ht', sql.NVarChar(100), req.body.tp)
        .execute('sp_HT_setRinstName')
        return res.status(200).send('updated')
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.post('/testpack/settested', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('ht', sql.NVarChar(100), req.body.tp)
        .execute('sp_HT_setTestedName')
        return res.status(200).send('updated')
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.get('/testpack/summary', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_tpSummary')
        return res.status(200).send(result.recordsets)
    } catch (er) {
        return res.status(400).send(er);
    }
});

module.exports = router;
