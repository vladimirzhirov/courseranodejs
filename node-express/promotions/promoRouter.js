const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());


promoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send all the promotions to you!');
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete((req, res, next) => {
        res.end('Deleting all promotions');
    });

promoRouter.route('/:promoId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get(function (req, res) {
        res.end('Will send details of the promoId: ' + req.params.promoId + ' to you!');
    })
    .put((req, res) => {
        res.write('Updating the promo: ' + req.params.promoId + '\n');
        res.end('Will update the promo: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promoId);
    })
    .delete((req, res) => {
        res.end('Deleting promo: ' + req.params.promoId);
    });


module.exports = promoRouter;