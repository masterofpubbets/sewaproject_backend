const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const usersRouter = require('./routers/usersR');
const topRouter = require('./routers/topR');
const cableR = require('./routers/cablesR');
const testPackR = require('./routers/testPackRouter');
const instRouter = require('./routers/instRouter');
const equipmentRouter = require('./routers/equipmentRouter');
const signalRouter = require('./routers/signalRouter');
const logsR = require('./routers/logsR');
const message = require('./routers/message');


app.use(express.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-API-KEY, x-auth-token, Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Request-Method, PARAM_HEADER');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('Access-Control-Expose-Headers', 'x-auth-token');

    // Pass to next layer of middleware
    next();
});

app.get('/',(req,res) => {
    res.status(200).send('YOU ARE IN THE ROOT baby');
});

app.use('/api/users',usersRouter);
app.use('/api/top', topRouter);
app.use('/api/cables', cableR);
app.use('/api/testpack', testPackR);
app.use('/api/instrument', instRouter);
app.use('/api/equipment', equipmentRouter);
app.use('/api/signal',signalRouter);
app.use('/api/msg', message);
app.use('/api/logs', logsR);

app.listen(port,() => {
    console.log('start listening on port ' + port);
});