const express = require('express');
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
    return res.status(200).send("You Are in Sql Server Mode instruments");
});

router.post('/instrumenttop', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('top', sql.NVarChar(100), req.body.top)
        .execute('sp_instrumentTop')
        return res.status(200).send(result.recordsets)
    } catch (er) { 
        return res.status(400).send(er);
    }
});

router.get('/summarymini', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_insSummaryMini')
        return res.status(200).send(result.recordsets)
    } catch (er) { 
        return res.status(400).send(er);
    }
});

router.get('/summary', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_InsSummary')
        return res.status(200).send(result.recordsets)
    } catch (er) { 
        return res.status(400).send(er);
    }
});

router.get('/calibrationsummary', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_CalibrationSummary')
        return res.status(200).send(result.recordsets)
    } catch (er) { 
        return res.status(400).send(er);
    }
});

router.get('/hookupsummarymini', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_instHookupSummaryMini')
        return res.status(200).send(result.recordsets)
    } catch (er) { 
        return res.status(400).send(er);
    }
});

router.get('/hookupsummary', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_InsHkSummary')
        return res.status(200).send(result.recordsets)
    } catch (er) { 
        return res.status(400).send(er);
    }
});

router.get('/list', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_getInstListMini')
        return res.status(200).send(result.recordsets)
    } catch (er) { 
        return res.status(400).send(er);
    }
});

router.post('/detail', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('tag', sql.NVarChar(100), req.body.tag)
        .execute('sp_getInstDetail')
        return res.status(200).send(result.recordsets)
    } catch (er) { 
        return res.status(400).send(er);
    }
});

router.post('/setcalibrated', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('tag', sql.NVarChar(100), req.body.tag)
        .execute('sp_INS_setCalibratedName')
        return res.status(200).send('updated')
    } catch (er) { 
        return res.status(400).send(er);
    }
});
router.post('/setinstalled', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('tag', sql.NVarChar(100), req.body.tag)
        .execute('sp_INS_setInstalledName')
        return res.status(200).send('updated')
    } catch (er) { 
        return res.status(400).send(er);
    }
});
router.post('/sethookup', auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('tag', sql.NVarChar(100), req.body.tag)
        .execute('sp_INS_setHookupName')
        return res.status(200).send('updated')
    } catch (er) { 
        return res.status(400).send(er);
    }
});

module.exports = router;