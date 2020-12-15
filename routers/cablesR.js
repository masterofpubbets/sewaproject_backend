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
        .input('top', sql.NVarChar(100), req.body.tag)
        .execute('sp_cablesTop')
        return res.status(200).send(result.recordsets)
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.get("/cableslist", auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_getCablesMini')
        return res.status(200).send(result.recordsets)
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.post("/setpulled", auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('tag', sql.NVarChar(100), req.body.tag)
        .execute('sp_CABLE_setPulledName')
        return res.status(200).send('updated')
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.post("/setconfrom", auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('tag', sql.NVarChar(100), req.body.tag)
        .execute('sp_CABLE_setCon1Name')
        return res.status(200).send('updated')
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.post("/setconto", auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('tag', sql.NVarChar(100), req.body.tag)
        .execute('sp_CABLE_setCon2Name')
        return res.status(200).send('updated')
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.get("/summary", auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_cablePullingSummaryByUnitMini')
        return res.status(200).send(result.recordsets)
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.post("/detail", auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('tag', sql.NVarChar(100), req.body.tag)
        .execute('sp_getCableDetails')
        return res.status(200).send(result.recordsets)
    } catch (er) {
        return res.status(400).send(er);
    }
});


module.exports = router;
