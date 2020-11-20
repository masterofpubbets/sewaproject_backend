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
    return res.status(200).send("You Are in Sql Server Mode top");
});

router.get("/summary", auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().execute('sp_topProgressSummary')
        return res.status(200).send(result.recordsets)
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.get("/summaryplanned", auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().execute('sp_topProgressSummaryPlanned')
        return res.status(200).send(result.recordsets)
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.get("/summarytype", auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().execute('sp_topProgressSummaryBYType')
        return res.status(200).send(result.recordsets)
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.get("/summaryplannedtype", auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().execute('sp_topProgressSummaryPlannedBYType')
        return res.status(200).send(result.recordsets)
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.get("/cutoffdate", auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .query("select format(cutoffDate,'dddd, dd-MM-yyyy') as cutoffDate from tblOptions where id=1")
        return res.status(200).send(result.recordsets)
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.get("/summarymini", auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_topSummaryMini')
        return res.status(200).send(result.recordsets)
    } catch (er) {
        return res.status(400).send(er);
    }
});

router.get("/warroomsummary", auth, async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .execute('sp_topSummary')
        return res.status(200).send(result.recordsets)
    } catch (er) {
        return res.status(400).send(er);
    }
});

module.exports = router;
