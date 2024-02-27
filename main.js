const express = require('express');
const bodyParser = require('body-parser');
const ipFilter = require('express-ipfilter').IpFilter;
const chalk = require('chalk');

const config = require('./config.json');

/* Create the server */
const app = express();
const port = config.api.port || 2208;

app
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(ipFilter(config.IpsAllow, { mode: 'allow' , logLevel: 'deny'}));

/* Add a logger */
app.use((req, res, next) => {
    if (!config.IpsAllow.includes(req.ip)) {
        console.log(chalk.red(`[API] ${req.ip} tried to access the API`));
    }

    if (req.method === 'GET') {
        console.log(chalk.green(`[${new Date().toUTCString()}] ${req.method} | ${req.path} | ${req.ip}`));
    }
    else if (req.method === 'POST') {
        console.log(chalk.red(`[${new Date().toUTCString()}] ${req.method} | ${req.path} | ${req.ip}`));
    }
    else if (req.method === 'PATCH') {
        console.log(chalk.yellow(`[${new Date().toUTCString()}] ${req.method} | ${req.path} | ${req.ip}`));
    }
    next();
});

/* Add routers */
app
    .use('/botExample', require('./routers/botExample.js'))
    .use('/guildExample', require('./routers/guildExample.js'))

/* Main endpoint */
app.get('/', (req, res) => res.json({"error": "Tuto youtube sur comment hack une API https://www.youtube.com/watch?v=dQw4w9WgXcQ"}));

/* Error page */
app.use((req,res) => res.status(404).json({"error": "Not Found", "status": 404}));

/* Start the server */
app.listen(port, config.api.hostname, function (err) {
    if (err) throw err;
    console.log(`Listening on : \x1b[42;30m${config.api.link}${port}\x1b[0m`);
});
