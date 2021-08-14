const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

const Leaders = require('../models/leaders');

var authenticate = require('../authenticate');

leaderRouter.route('/')


.post(authenticate.verifyUser, (req, res, next) => {


})

.put(authenticate.verifyUser, (req, res, next) => {



})

.delete(authenticate.verifyUser, (req, res, next) => {



});

leaderRouter.route('/:leaderId')


.post(authenticate.verifyUser, (req, res, next) => {

})

.put(authenticate.verifyUser, (req, res, next) => {

})

.delete(authenticate.verifyUser, (req, res, next) => {

});



leaderRouter.route('/:leaderId')
    .get(function (req, res, next) {
        Leaderships.findById(req.params.leaderId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
         Leaders.findByIdAndUpdate(req.params.leaderId, {
                $set: req.body
            }, { new: true })
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /leaders/' + req.params.leaderId);
    })
    .delete((req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = leaderRouter;