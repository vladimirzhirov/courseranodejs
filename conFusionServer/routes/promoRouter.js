const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

const Promotions = require('../models/promotions');

var authenticate = require('../authenticate');

promoRouter.route('/')


.post(authenticate.verifyUser, (req, res, next) => {


})

.put(authenticate.verifyUser, (req, res, next) => {



})

.delete(authenticate.verifyUser, (req, res, next) => {



});

promoRouter.route('/:promoId')


.post(authenticate.verifyUser, (req, res, next) => {

})

.put(authenticate.verifyUser, (req, res, next) => {

})

.delete(authenticate.verifyUser, (req, res, next) => {

});



promoRouter.route('/:promoId')
    .get(function (req, res, next) {
        Promotions.findById(req.params.promoId)
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
         Promotions.findByIdAndUpdate(req.params.promoId, {
                $set: req.body
            }, { new: true })
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promoId);
    })
    .delete((req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promoId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = promoRouter;