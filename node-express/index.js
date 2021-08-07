const express = require('express'),
    http = require('http');

const hostname = 'localhost';
const port = 3000;

const dishRouter = require('./dishes/dishRouter');
const promoRouter = require('./promotions/promoRouter');
const leaderRouter = require('./leaders/leaderRouter');


const app = express();

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

const morgan = require('morgan');


app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
